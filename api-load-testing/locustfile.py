from locust import HttpUser, TaskSet, task, between


class APITasks(TaskSet):

    @task(1)
    def list_students(self):
        url = "/api/listStudents/"
        headers = {
            'sec-ch-ua': '"Chromium";v="128", "Not;A=Brand";v="24", "Brave";v="128"',
            'Accept': 'application/json, text/plain, */*',
            'sec-ch-ua-platform': '"macOS"',
            'Referer': 'http://localhost:3000/',
            'sec-ch-ua-mobile': '?0',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
            'Content-Type': 'application/json'
        }
        data = '{"offset":0,"limit":5}'
        response = self.client.post(url, headers=headers, data=data)
        if response.status_code == 200:
            print("List Students Success")
        else:
            print(f"List Students Failed with status code {
                  response.status_code}")

    @task(1)
    def add_student(self):
        url = "/api/addStudent/"
        headers = {
            'sec-ch-ua': '"Chromium";v="128", "Not;A=Brand";v="24", "Brave";v="128"',
            'Accept': 'application/json, text/plain, */*',
            'sec-ch-ua-platform': '"macOS"',
            'Referer': 'http://localhost:3000/',
            'sec-ch-ua-mobile': '?0',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
            'Content-Type': 'application/json'
        }
        data = '{"name":"Jojo","age":"23","class":"12"}'
        response = self.client.post(url, headers=headers, data=data)
        if response.status_code == 200:
            print("Add Student Success")
        else:
            print(f"Add Student Failed with status code {
                  response.status_code}")

    @task(1)
    def matrix_multiply(self):
        url = "/api/matrixMultiply/"
        headers = {
            'sec-ch-ua': '"Chromium";v="128", "Not;A=Brand";v="24", "Brave";v="128"',
            'Accept': 'application/json, text/plain, */*',
            'sec-ch-ua-platform': '"macOS"',
            'Referer': 'http://localhost:3000/',
            'sec-ch-ua-mobile': '?0',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
            'Content-Type': 'application/json'
        }
        response = self.client.get(url, headers=headers)
        if response.status_code == 200:
            print("Success")
        else:
            print(f" Failed with status code {
                  response.status_code}")


class APIUser(HttpUser):
    tasks = [APITasks]
    # wait_time = between(1, 5)  # wait between 1 and 5 seconds between tasks
    host = "http://localhost:5001" # Replace this with PROD endpoint when running test on production  in GCP
