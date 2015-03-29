#####################################################################################
# Vagrant Development Environment for Employee Scheduling application.              #
#                                                                                   #
# Author: Martin Micunda                                                            #
#-----------------------------------------------------------------------------------#
# Prerequisites: Virtualbox, Vagrant, Ansible                                       #
# Usage: command 'vagrant up' in the folder of the Vagrantfile                      #
#####################################################################################

# Vagrantfile API/syntax version. Don't touch unless you know what you're doing!
VAGRANTFILE_API_VERSION = "2"

PROJECT_NAME = "employee-scheduling"


# This Vagrant environment requires Vagrant 1.6.0 or higher.
Vagrant.require_version ">= 1.6.0"

unless Vagrant.has_plugin?("vagrant-hostmanager")
    raise 'Vagrant-hostmanager is not installed! Please run `vagrant plugin install vagrant-hostmanager` before continuing`.'
end

#####################################################################################
#                             VAGRANT MAGIC BEGINS HERE                             #
#-----------------------------------------------------------------------------------#
#          For full documentation on vagrant please visit www.vagrantup.com!        #
#####################################################################################

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
    # Specify the base box
    config.vm.box = "ubuntu/trusty64"

    # mongodb
    #config.vm.network "forwarded_port", guest: 27017, host: 27017
    # redis
    #config.vm.network "forwarded_port", guest: 6379, host: 6379

    config.vm.network "forwarded_port", guest: 8100, host: 8100
    config.vm.network "forwarded_port", guest: 35729, host: 35729
    config.vm.network "forwarded_port", guest: 3000, host: 3000

    #config.vm.synced_folder "./", "/vagrant"
    config.vm.synced_folder ".", "/home/vagrant"
    config.vm.network "private_network", ip: "192.168.33.20"

    # Provision the VirtualBoxes with Ansible
    config.vm.provision "ansible" do |ansible|
        ansible.playbook = "ansible/playbook.yml"
        ansible.extra_vars = { ansible_ssh_user: 'vagrant' }
        ansible.raw_arguments = ['-v']
    end

    # Configure VM settings for servers running in VirtualBox
    config.vm.provider "virtualbox" do |vb|
        vb.memory = 1024
        vb.cpus = 2
    end
end
