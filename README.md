# D-Home![enter image description here](http://i66.tinypic.com/23vaufa.png)

**D-Home** is a home automation software for your smart home.
The main element of D-Home is the **module**. It contains all the attributes and functions for controlling devices or monitoring their status. The software offers developers the ability to write their own modules.

## Prerequisites


To run this software you need node-v8.12.0 or higher.
**Android:** > pkg install nodejs
**Arch Linux**:> pacman -S nodejs npm
**macOS** *usingHomebrew*: > brew install node
**Windows** Simply download the  [Windows Installer](https://nodejs.org/#download)  directly from the  [nodejs.org](https://nodejs.org/)  web site.
> npm install


## Installing

  
After downloading the project folder, go inside the and folder and install npm packages: locally or globally. Choose which kind of installation to use based on how you want to use the package.

> npm install

To confirm that `npm install` worked correctly, check to see that a `node_modules`directory exists and that it contains a directory for the package(s) you installed.

## Modules

  
**D-Home** offers the user the possibility to add **modules** written by the user himself. A module is related to a specific device and contains all its *attributes* and *functions*. 
Functions such as on and off, timer and any other function that is supported by the device can be implemented in the module by the user and then be used within the software. The first module present in D-Home developed by me is that related to the **Sonoff** device and offers the following attributes and functionality: set of standard attributes, discovery function, check availability function, power on and off commands

#### Standards
  
Each module has standards, ie attributes that must always be present in the modules that a developer will add.
![enter image description here](http://i63.tinypic.com/nfrzv8.jpg)
## Getting Started

  To run the software use the command 

> node server.js

And go to :

> http://localhost:3000/admin

Below is a list of the main features and characteristics of the software.

 1.   **Authentication service**: each user has the possibility to create his own account through which to access.
 2.   **Adding modules**: the user can add modules to the software. A module is related only to a type of device and encompasses all its attributes and functions.
 3.   **Discovery**: the service through which you can examine your home network looking for devices.
 4.   **Adding devices**: each user will have the possibility to add and configure the devices found through the discovery. Each device can subsequently be controlled via the dashboard.
 5. **Dashboard**: Panel fully editable and customizable by the user through which you can add various elements (buttons, switches, sliders, etc. ..) which are associated with the devices that control or monitor them.

## Main Page
  
Here is the main page: on the left a menu through which you can access all the features of D-Home

![](https://lh3.googleusercontent.com/jm1B-RA4X4CWb7t4c8v5-Zj-iy6TasHktuHryrC7yD2vIFmcILOaaWigFUHzYxuF4rMMVe9s2cDUnnTFPaHjRjyQMftkli2_YLPfiXp9Y0g2E6ULM01fsINw_OfNYQyEb3Ob0k-SfXM)

### Registration

Through the software you can register one or more home accounts (for example one for each family member, office etc.) through which you can log, add your own devices and configure your own dashboards.
**![](https://lh5.googleusercontent.com/-IcITeNZKoUa0lTYkA_sS0TfgNboWrqCWqPTsDfAlOtq4U6-boAWB-c0CT6_UPKCWvO1NCYmmSaev1o1rwg_QH95g4KidmnY50ipCylNHeMDELVLDTu40wVo8U3-UYsppSpk1-kh)**
### Devices
  
By accessing the dedicated area through the menu on the left you can check all the devices associated, viewing for each, the name, IP address, MAC address, type and status previously explained.
**![](https://lh6.googleusercontent.com/CzYf6fiDOBPjVcaw6VG0w4lYNvvIKZLvvp0Sx_RFOlCVUBansOWxosI3bWfK_K2hkLQVsTyc3qF8Daw4j_6X9wYSH6kEXhQsoac_tfnwclqZJK3jmtxjhRX4vwWCI51wvNas7zcH)**
**![](https://lh3.googleusercontent.com/HoKawt0ow0EA9SFmI_1l3GOUkVz7gP70BByN-1NLI3n82JIrEoQsE9M2SjuP-m0_JfkdS0JmOLi-PScd55CAVF-UI7s5CnOnFWVEj-p1d6qA1VKQRDsuMZFQ0BS8ebA1lQVMUyRE)**

## Dashboard
The software provides the user with a dashboard through which it is possible to monitor the status of the associated devices and through configurable elements, such as switch buttons, to control them. A developer who approaches D-Home also has the opportunity to develop new elements to then go to associate with new devices and new modules developed by him.
The main features of the dashboard are the following:

 1. Add or delete items (buttons and switches). 
 2.  Modify the added elements, choosing the name, the location, the device associated 		   with it, the functions supported by the device to
    be started when interacting with the element.
  3. Add dashboard.
 3. Possibility to savethe dashboard.
 4. Possibility to refresh the dashboard. 
 5.  Position the elements to customize the dashboard to your liking.

Now let's analyze how it looks graphically

**![](https://lh6.googleusercontent.com/rMAQSvg6tCNh5oo4auNmBdY0hMNABGs-SmkahUKT4rhuJtBXXWJ77bqqaM0GMyr2Twif9Gafs1NdJ0Rk-z3zcZ724EO8bfYIrrxGSYZ3d9GfwuIxgRe_dwqbFb-DKadbrso-Jl590Fw)**
![](https://lh6.googleusercontent.com/5ooiXH83bjFOYgNOvX9RVAkqd8O-6uOb-xmoD3KeS7SUS2MaUpTQ3PZNhcrO01iF8BStGZdco6dGM_nc27d4SBVHgdbiR4MkwS39qT_JDOFzpaGLoaNiLa0PniIsUpANv_007l6U)  ![](https://lh6.googleusercontent.com/816VF6-sQxxQTXA24PeARpDCGf5Wp3-dcNjwXG3520cpWN2fmJiyWV_OCPxkZX3TFYmG2TarEY0zzQ-DWbvKmsK6D5eLgVhvvRgvtm1DaT5iiaXJntzDaLmTD7XAjCvaT979lLLB)![](https://lh5.googleusercontent.com/AJ0ZPdishJRoRGLsmk0W51HVYDY7p9YIyby4tl8OXDEiayP-H4JcU6QHeeU2m_qEvfLbqDezRvx73E-CCUS_ZJgaMYMV_1LoqzZt_h7K2WHuGvjNmL_aG1lAYLkMyprRWMs8K0ui)![](https://lh6.googleusercontent.com/OywLTWfvsgl776YK8m4uFLvwwM4NJ8Aemcjgmp-M8LoGubWKzWgTLv-BqqZoTuSQDx_G58HpfeMl7WiEe-P6fUmKSXonN2F-H8pr-RF0Jl2gh58Jd_AGd6u7-wdP_SOLNHQyCw4F)
  
Through this configuration screen the user has the possibility to choose the name of the button and associate it with a previously added device. Once the device has been selected, all the functions in the module related to the device are checked and loaded and the user can choose which one to associate with the button. In the case of a button the associable function is one.
## Public interfaces

Once launched on a machine all the devices connected to the same subnet have the possibility to visit the public interface of the software, which allows only to view and modify one or more dashboards.
It will indeed be possible to run through the public interface:

> localhost:3000

