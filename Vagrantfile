#####################################################################################
# Vagrant Development Environment for Ionic applications.                           #
#                                                                                   #
# Author: Martin Micunda                                                            #
#-----------------------------------------------------------------------------------#
# Prerequisites: Virtualbox, Vagrant, Ansible                                       #
# Usage: command 'vagrant up' in the folder of the Vagrantfile                      #
#####################################################################################

# Vagrantfile API/syntax version. Don't touch unless you know what you're doing!
VAGRANTFILE_API_VERSION = "2"

# This Vagrant environment requires Vagrant 1.6.0 or higher.
Vagrant.require_version ">= 1.6.0"

#####################################################################################
#                             VAGRANT MAGIC BEGINS HERE                             #
#-----------------------------------------------------------------------------------#
#          For full documentation on vagrant please visit www.vagrantup.com!        #
#####################################################################################

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
    # Specify the base box
    config.vm.box = "ubuntu/trusty64"

    # ionic
    config.vm.network "forwarded_port", guest: 8100, host: 8100
    # livereload
    config.vm.network "forwarded_port", guest: 35729, host: 35729
    # server app
    config.vm.network "forwarded_port", guest: 3000, host: 3000

    config.vm.synced_folder ".", "/home/vagrant/ionic-photo-gallery"

    # Provision the VirtualBoxe with Ansible
    config.vm.provision "ansible" do |ansible|
        ansible.playbook = "ansible/playbook.yml"
        ansible.raw_arguments = ['-v']
    end

    # Configure VM settings for server running in VirtualBox
    config.vm.provider "virtualbox" do |vb|
        # set the Video Ram to 128 megs
        vb.customize ["modifyvm", :id, "--vram", "128"]
        # turn on the USB drivers so that we can connect an Android device
        vb.customize ["modifyvm", :id, "--usb", "on"]
        # add a usb device filter for a Android Device
        vb.customize ["usbfilter", "add", "0", "--target", :id, "--name", "android", "--vendorid", "0x18d1"]
        # this is the name in the VirtualBox Manager UI
        vb.name = "IonicBox"
        # set the system memory for the virtual machine
        vb.memory = 2048
        # number of Physical CPUs to allocate
        vb.cpus = 2
    end
end
