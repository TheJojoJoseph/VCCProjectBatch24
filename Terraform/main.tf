# Configure the Google Cloud provider
provider "google" {
  credentials = file("./service-account-key.json")  
  project     = var.project_id  # Make sure var.project_id is defined in your variables.tf
  region      = "us-central1"   # Specify your region
}

# Create a health check for the instance group
resource "google_compute_health_check" "default" {
  name = "docker-training-health-check"
  http_health_check {
    port         = 80
    request_path = "/"
  }
}

# Create an instance template
resource "google_compute_instance_template" "template" {
  name         = "docker-training-template"
  machine_type = "f1-micro"  # 0.5 GB RAM
  region       = "us-central1"

  disk {
    source_image = "ubuntu-os-cloud/ubuntu-2004-lts"
    auto_delete  = true
  }

  network_interface {
    network = "default"
    access_config {  # This block assigns a public IP
      // You can optionally set `nat_ip` here for a specific static IP.
    }
  }

  metadata_startup_script = <<-EOT
    #!/bin/bash
    sudo apt-get update
    sudo apt-get install -y docker.io docker-compose git

    # Clone the GitHub repository
    git clone https://github.com/TheJojoJoseph/DockerTrainingIITJ.git /home/ubuntu/DockerTrainingIITJ

    # Navigate to the Docker Compose directory
    cd /home/ubuntu/DockerTrainingIITJ

    # Run Docker Compose
    sudo docker-compose up -d
  EOT
}

# Create a managed instance group
resource "google_compute_region_instance_group_manager" "ig_manager" {
  name               = "docker-training-ig"
  base_instance_name = "docker-training-instance"
  target_size        = 1  # Initial instance count

  version {
    instance_template = google_compute_instance_template.template.self_link
  }

  named_port {
    name = "http"
    port = 80
  }

  region = "us-central1"

  auto_healing_policies {
    health_check      = google_compute_health_check.default.self_link
    initial_delay_sec = 300
  }
}

# Create an autoscaler for the instance group
resource "google_compute_region_autoscaler" "autoscaler" {
  name   = "docker-training-autoscaler"
  region = "us-central1"
  target = google_compute_region_instance_group_manager.ig_manager.self_link

  autoscaling_policy {
    min_replicas = 1
    max_replicas = 5
    cpu_utilization {
      target = 0.6  # Target CPU utilization percentage
    }
  }
}

# Output the instance group URL
output "instance_group_url" {
  value = google_compute_region_instance_group_manager.ig_manager.self_link
}
