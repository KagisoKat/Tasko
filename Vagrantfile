Vagrant.configure("2") do |config|
  # Use Ubuntu 22.04 LTS
  config.vm.box = "ubuntu/jammy64"
  
  # Set VM name
  config.vm.hostname = "tasko-docker"
  
  # Forward ports for your application
  config.vm.network "forwarded_port", guest: 3000, host: 3000  # Frontend
  config.vm.network "forwarded_port", guest: 5000, host: 5000  # Backend
  config.vm.network "forwarded_port", guest: 5432, host: 5432  # PostgreSQL
  
  # Sync your project folder
  config.vm.synced_folder ".", "/home/vagrant/Tasko"
  
  # VirtualBox settings
  config.vm.provider "virtualbox" do |vb|
    vb.name = "Tasko-Docker-VM"
    vb.memory = "2048"
    vb.cpus = 2
  end
  
  # Provision Docker installation
  config.vm.provision "shell", inline: <<-SHELL
    # Update package list
    apt-get update
    
    # Remove old Docker packages if any
    for pkg in docker.io docker-doc docker-compose docker-compose-v2 podman-docker containerd runc; do 
      apt-get remove -y $pkg 2>/dev/null || true
    done
    
    # Install prerequisites
    apt-get install -y ca-certificates curl gnupg
    
    # Add Docker's official GPG key
    install -m 0755 -d /etc/apt/keyrings
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
    chmod a+r /etc/apt/keyrings/docker.gpg
    
    # Set up Docker repository
    echo \
      "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
      $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
      tee /etc/apt/sources.list.d/docker.list > /dev/null
    
    # Install Docker Engine
    apt-get update
    apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
    
    # Add vagrant user to docker group
    usermod -aG docker vagrant
    
    # Enable Docker service
    systemctl enable docker
    systemctl start docker
    
    echo "Docker installed successfully!"
    docker --version
    docker compose version
  SHELL
end
