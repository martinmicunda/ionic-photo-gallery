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

    config.vm.synced_folder ".", "/home/vagrant", mode: '777'
    config.vm.network "private_network", ip: "192.168.33.10"

    # Provision the VirtualBoxes with Ansible
    config.vm.provision "ansible" do |ansible|
        ansible.playbook = "site.yml"
        ansible.raw_arguments = ['-v']
    end

    # Configure VM settings for servers running in VirtualBox
    config.vm.provider "virtualbox" do |vb|
        vb.memory = 1024
        vb.cpus = 2
    end
end
