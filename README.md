Ionic Photo Gallery
======================

A hybrid app with authentication that allows registered users view a gallery of photos they have uploaded via the camera phone.

1. Start Genymotion
2. Open Genymotion Shell
3. Run follow command to get IP address

```bash
$ devices list
```
you should see something like this:

```bash
Genymotion virtual device 0 is off. Please select a new virtual device with command : devices select
Available devices:

 Id | Select |    Status     |   Type   |   IP Address    |      Name
----+--------+---------------+----------+-----------------+---------------
  0 |        |            On |  virtual |  192.168.58.101 | Samsung Galaxy S4 - 4.4.4 - API 19 - 1080x1920
```
5. Go to vagrant box using 'vagrant up' and 'vagrant ssh'.
6. Type: `adb connect 192.168.56.101` and `adb devices`. You should see something like this:
```
vagrant@vagrant-ubuntu-trusty-64:~$ adb connect 192.168.58.101
connected to 192.168.58.101:5555
vagrant@vagrant-ubuntu-trusty-64:~$ adb devices
List of devices attached
192.168.58.101:5555     device
```
7. Run `ionic run android`

## License

    The MIT License
    
    Copyright (c) 2015 Martin Micunda  

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:
    
    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.
    
    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
    THE SOFTWARE.
