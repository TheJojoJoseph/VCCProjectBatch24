provider "google" {
  credentials = file("./service-account-key.json")
  project     = var.project_id
  region      = "us-central1"
}

# Health check for the instance group
resource "google_compute_health_check" "default" {
  name = "docker-training-health-check"

  http_health_check {
    port         = 80
    request_path = "/"
  }
}

# Instance template with startup script to install Docker, clone repo, and run Docker Compose
resource "google_compute_instance_template" "template" {
  name         = "docker-training-template"
  machine_type = "n1-standard-1" # 3.75 GB RAM

  disk {
    source_image = "ubuntu-os-cloud/ubuntu-2004-lts"
    auto_delete  = true
  }

  network_interface {
    network = "default"
    access_config {} # Assigns a public IP
  }

  metadata_startup_script = <<-EOT
    #!/bin/bash
    sudo apt-get update
    sudo apt-get install -y docker.io docker-compose git

    # Retry cloning the GitHub repository if it fails
    retries=5
    until [ $retries -le 0 ]; do
      git clone https://github.com/TheJojoJoseph/VCCProjectBatch24.git /home/ubuntu/VCCProjectBatch24 && break
      echo "Failed to clone repository. Retrying in 10 seconds..."
      retries=$((retries-1))
      sleep 10
    done

    # Navigate to the Docker Compose directory and run the services
    cd /home/ubuntu/VCCProjectBatch24
    sudo docker-compose up -d
  EOT
}

# Managed instance group with scaling policies
resource "google_compute_region_instance_group_manager" "ig_manager" {
  name               = "docker-training-ig"
  base_instance_name = "docker-training-instance"
  target_size        = 1 # Initial instance count

  version {
    instance_template = google_compute_instance_template.template.self_link
  }

  named_port {
    name = "http"
    port = 80
  }

  named_port {
    name = "app-port-8000"
    port = 8000
  }

  named_port {
    name = "app-port-5001"
    port = 5001
  }

  region = "us-central1"

  auto_healing_policies {
    health_check      = google_compute_health_check.default.self_link
    initial_delay_sec = 300
  }
}

# Autoscaler for the instance group
resource "google_compute_region_autoscaler" "autoscaler" {
  name   = "docker-training-autoscaler"
  region = "us-central1"
  target = google_compute_region_instance_group_manager.ig_manager.self_link

  autoscaling_policy {
    min_replicas = 1
    max_replicas = 5
    cpu_utilization {
      target = 0.8 # Target CPU utilization percentage
    }
  }
}

# Firewall rule to allow traffic on ports 80, 8000, and 5001
resource "google_compute_firewall" "allow_http_ports" {
  name    = "allow-http-ports"
  network = "default"

  allow {
    protocol = "tcp"
    ports    = ["80", "8000", "5001"]
  }

  source_ranges = ["0.0.0.0/0"] # Allows traffic from anywhere (adjust as necessary)
}

# Output the instance group URL
output "instance_group_url" {
  value = google_compute_region_instance_group_manager.ig_manager.self_link
}

# Output the exposed ports
output "exposed_ports" {
  value = [
    "80 (HTTP)",
    "8000 (App Port)",
    "5001 (App Port)"
  ]
}
