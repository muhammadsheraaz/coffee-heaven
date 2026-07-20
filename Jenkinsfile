pipeline {

    agent any

    environment {
        img_name = "muhammadsheraaz/coffee-heaven-cicd"
        img_tag = "latest"
        cont_name = "coffee-heaven"
    }

    stages {

        stage('Checkout Source Code') {
            steps {
                checkout scm
            }
        }

        stage('Verify Environment') {
            steps {
                sh 'pwd'
                sh 'ls -la'
                sh 'git --version'
                sh 'docker --version'
                sh 'java -version'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $img_name:$img_tag .'
            }
        }

        stage('Login to Docker Hub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {

                    sh 'docker login -u "$DOCKER_USER" -p "$DOCKER_PASS"'

                }
            }
        }

        stage('Push Docker Image') {
            steps {
                sh 'docker push $img_name:$img_tag'
            }
        }

        stage('Deploy Container') {
            steps {
                sh 'docker stop $cont_name || true'
                sh 'docker rm $cont_name || true'
                sh 'docker run -d --name $cont_name -p 8081:80 $img_name:$img_tag'
            }
        }
    }

    post {

        success {
            echo 'Pipeline Executed Successfully'
        }

        failure {
            echo 'Pipeline Failed'
        }

        always {
            sh 'docker image ls'
            sh 'docker ps -a'
        }
    }
}
