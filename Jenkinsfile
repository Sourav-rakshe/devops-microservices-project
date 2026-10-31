pipeline {
    agent any

    environment {
        APP_NAME   = 'devops-microservice'
        IMAGE_TAG  = "${BUILD_NUMBER}"
        KUBECONFIG = '/var/lib/jenkins/.kube/config'
    }

    stages {
        stage('Checkout Source') {
            steps {
                echo 'Checking out source code from Git repository...'
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                echo "Building Docker Image: ${APP_NAME}:${IMAGE_TAG}..."
                sh "docker build -t ${APP_NAME}:${IMAGE_TAG} app/"
                sh "docker tag ${APP_NAME}:${IMAGE_TAG} ${APP_NAME}:latest"
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                echo 'Loading image to Minikube cluster...'
                sh "minikube image load ${APP_NAME}:${IMAGE_TAG}"
                echo 'Applying Kubernetes manifests...'
                sh "kubectl apply -f k8s/deployment.yaml"
                sh "kubectl apply -f k8s/service.yaml"
                sh "kubectl set image deployment/microservice-deployment microservice-container=${APP_NAME}:${IMAGE_TAG}"
            }
        }

        stage('Verify Rollout') {
            steps {
                echo 'Verifying deployment rollout status...'
                sh "kubectl rollout status deployment/microservice-deployment --timeout=60s"
                sh "kubectl get pods -l app=microservice"
            }
        }
    }

    post {
        success {
            echo "Pipeline executed successfully! Build #${BUILD_NUMBER} deployed."
        }
        failure {
            echo "Pipeline execution failed. Check Jenkins logs for details."
        }
    }
}
