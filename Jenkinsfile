pipeline {
    agent any
    tools {
        nodejs 'nodejs-19'
    }
    // parameters {
    //     choice(name: 'DOCKER_REGISTRY', choices: ['Docker Hub', 'Amazon ECR'], description: 'Choose the Docker registry to push the image to')
    //     choice(name: 'DEPLOY_TO', choices: ['K8S', 'EC2'], description: 'Choose where to deploy')
    // }
    environment {
        SERVER_ADDRESS = '3.123.129.244'
        SERVER_USERNAME = 'ec2-user'
        DOCKER_IMAGE_NAME = 'mahdiboudaouara/reactappimage'
        PROJECT_NAME = 'clientservice'
        REPO_SERVER = '739761511001.dkr.ecr.eu-central-1.amazonaws.com'
        ECR_REGISTRY = '739761511001.dkr.ecr.eu-central-1.amazonaws.com/ecr-mahdi'
        APP_URL = '143-42-223-116.ip.linodeusercontent.com'
        AWS_REGION = 'eu-central-1'
    }
    stages {
        stage('Install dependencies and testing') {
            steps {
                sh 'sleep 14'
            }
        }
        stage('increment version') {
            steps {
                script {
                    echo 'incrementing app version...'
                    sh 'npm version patch --no-git-tag-version --allow-same-version'
                    def version = sh(returnStdout: true, script: 'npm version')
                    def versionProps = readJSON text: version
                    env.IMAGE_TAG = "${versionProps[env.PROJECT_NAME]}-${BUILD_NUMBER}"
                }
            }
        }
        stage('Create .env file') {
            steps {
                script {
                    def envContent = 'REACT_APP_USER_SERVER=143-42-223-116.ip.linodeusercontent.com\nREACT_APP_AUCTION_SERVER=143-42-223-116.ip.linodeusercontent.com\nREACT_APP_BID_SERVER=143-42-223-116.ip.linodeusercontent.com\nREACT_APP_CLIENT=143-42-223-116.ip.linodeusercontent.com'
                    writeFile(file: '.env', text: envContent)
                }
            }
        }
        stage('Push Image') {
            steps {
                script {
                        sh 'docker build -t ${DOCKER_IMAGE_NAME}:${IMAGE_TAG} .'
                        // Push the image to Docker Hub
                        withCredentials([usernamePassword(credentialsId: 'dockerhub', passwordVariable: 'PASS', usernameVariable: 'USER')]) {
                            sh "echo $PASS | docker login -u $USER --password-stdin"
                            sh "docker push ${DOCKER_IMAGE_NAME}:${IMAGE_TAG}"
                        }
                }
            }
        }
        stage('Deploy') {
            when {
                branch 'main'
            }
            steps {
                script {
                        build job: 'helm-auction/main', propagate: true, wait: true , parameters: [
                            [$class: 'StringParameterValue', name: 'IMAGE_TAG', value: "${IMAGE_TAG}"],
                            [$class: 'StringParameterValue', name: 'DOCKER_IMAGE_NAME', value: "${DOCKER_IMAGE_NAME}"],
                            [$class: 'StringParameterValue', name: 'PROJECT_NAME', value: "${PROJECT_NAME}"]]
                }
            }
        }
        stage('commit version update') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'github', passwordVariable: 'PASS', usernameVariable: 'USER')]) {
                        // git config here for the first time run
                        sh 'git config --global user.email "mahdijenkins@jenkins.com"'
                        sh 'git config --global user.name "mahdijenkins"'
                        sh "git remote set-url origin https://${USER}:${PASS}@github.com/Mahdiboudaouara/clientP2M.git"
                        sh 'git add .'
                        sh 'git commit -m "ci: version bump"'
                        sh "git push origin HEAD:${BRANCH_NAME}"
                    }
                }
            }
        }
    }
    post {
        always {
            cleanWs()
            sh 'rm -rf node_modules' // Clean up after build
        }
    }
}
