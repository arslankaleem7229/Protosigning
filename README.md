# ProtoSigning

## ProtoTyping tool


![Badges](https://img.shields.io/github/issues/arslankaleem7229/Protosigning)	![Badges](https://img.shields.io/github/forks/arslankaleem7229/Protosigning)	![Badges](https://img.shields.io/github/stars/arslankaleem7229/Protosigning)	![Badges](https://img.shields.io/github/license/arslankaleem7229/Protosigning)

## About
ProtoSigning is a web-based prototyping tool by which anyone can design UI/UX for web, logos. ProtoSigning gives customization to user by which user can customize already build logos and web interefaces.

## Introduction
The purpose of this application is to automate such efforts that are done manually by the users. These efforts are time consuming and required professionals. Our System will focus to minimize these complexities and provide simple and unique procedure for modeling.
##### For example
* While the user is designing a prototype for the client and needs different components like shapes, objects, widgets, he/she can grab it easily from the system repository and use it for free. Not only this, end-user can define a any response against any event that will be occurred, e.g. user click on the button and the system visits to the next page or something likethat. These all response will be handled by the system once the end-users specify these responses against any action or an event to be occurred. 
*  End-users will also be able to recover graphical vector file (SVG file) from a .PNG file. The purpose of re-generating this SVG file is to segment all the possible shapes within the PNG image file and then transform into vectors so that these shapes can be reusable and customizable again. 

## Brief Overview
Nowadays most of the designs whether it’s a website front-end GUI or a company LOGO are costly and not affordable by many of the people. These people want the exact copy of these digital designs either in cheap rates or free of cost. We provide such platform where user can be able to get an acceptable copy of these digital designs in such formats that can be customizable and editable and can be personalized by the user. While designing a front-end GUI by the user in our system, system will keep track of the user activities and generate code for each activity. The code that is generated from these activities can later be used by the developers to link them with their back-end code and create a full stack applicationThe purpose of this application is to automate such efforts that are done manually by the users. 
These efforts are time consuming and required professionals. Our System will focus to minimize these complexities and provide simple and unique procedure for modeling. To our knowledge, there is no such system exist which is providing free logos and templates however they are charging so much for logos and if someone want a logo, he/she has to hire a graphic designer for this task. So, we tried our best to facilitate the user by providing free logos as well as good editor to take some logo and change it according to own will. Except designing from scrap now user can easily modify the desire logo according to own mindset. 


## Algorithm

### A* Search Algorithm

#### A* Algorithm

A\* is a graph traversal and path search algorithm, which is often used in many fields of computer science due to its completeness, optimality, and optimal efficiency. One major practical drawback is its space complexity, as it stores all generated nodes in memory. We used A* search algorithm in our system to easy the user to design logo by searching logos’ template against keyword to easy the user.
 ![Figure: A* Algorithm](https://github.com/arslankaleem7229/Protosigning/blob/master/Screenshots/Algorithms/Astar.jpg)
#### K-mean Algorithm

![Figure:K-mean Algorithm](https://github.com/arslankaleem7229/Protosigning/blob/master/Screenshots/Algorithms/Kmean.png)

k-means clustering is a method of vector quantization, originally from signal processing, that aims to partition n observations into k clusters in which each observation belongs to the cluster with the nearest mean, serving as a prototype of the cluster. We are implementing this algorithm in our system to create multiple layers/cluster components in an image and find basic colors in an image to breakdown the image components in different parts on the basis of these clusters and make them editable for ease of user.

####	Tag Generator

Tag generator has been used to search in database and get all possible search tags that user can use to find logo templates

####	Image Filtering

We implemented Image filtering in our system to apply filter on an image, remove noise which helps designer to design logos in best quality, smoothing image, sharpen image. After these steps system apply conversion on image to differentiate the components for easy use.

####	SVG path editor

SVG path editor is implemented to customize or edit the detected paths of the image’s object.

####	HTML and CSS generator

This algorithm helps us to generate HTML and CSS code of the components on workspace to make editing easy and after finalizing of project user can download the generated code.
 
####	Kernel filtering

The Sobel operator, sometimes called the Sobel–Feldman operator or Sobel filter, is used in image processing and computer vision, particularly within edge detection algorithms where it creates an image emphasizing edges

 

####	Edge detector
 
![Figure: kernel filtering](https://github.com/arslankaleem7229/Protosigning/blob/master/Screenshots/Algorithms/Kernelfiltering.png)
 

Edge detector is used to detect the edges of an object in image and convert these edges into SVG. We implemented two edge detection algorithms in our system:
•	Canny edge detector
•	Sobel edge detector

#####	Canny edge detector
The Canny edge detector is an edge detection operator that uses a multi-stage algorithm to detect a wide range of edges in images. It was developed by John F. Canny in 1986. Canny also produced a computational theory of edge detection explaining why the technique works.
 
![Figure: Canny edge detector](https://github.com/arslankaleem7229/Protosigning/blob/master/Screenshots/Algorithms/CannyEdgeDetector.png)
 
#####	Sobel edge detector
The Sobel operator, sometimes called the Sobel–Feldman operator or Sobel filter, is used in image processing and computer vision, particularly within edge detection algorithms where it creates an image emphasizing edges.

![Figure: Sobel Edge detector](https://github.com/arslankaleem7229/Protosigning/blob/master/Screenshots/Algorithms/SobelEdgeDetctor.png)

# User Interface

![Figure: Main Page](https://github.com/arslankaleem7229/Protosigning/blob/master/Screenshots/1.PNG)
![Figure: Logo Extraction from Imag](https://github.com/arslankaleem7229/Protosigning/blob/master/Screenshots/1.PNG)
![Figure: Code generation](https://github.com/arslankaleem7229/Protosigning/blob/master/Screenshots/2.PNG)
![Figure: Web designs](https://github.com/arslankaleem7229/Protosigning/blob/master/Screenshots/3.PNG)
![Figure: Data interpretation](https://github.com/arslankaleem7229/Protosigning/blob/master/Screenshots/4.PNG)
![Figure: Team Collaboration](https://github.com/arslankaleem7229/Protosigning/blob/master/Screenshots/5.PNG)
![Figure: SVG tools](https://github.com/arslankaleem7229/Protosigning/blob/master/Screenshots/6.PNG)
![Figure: Registration page](https://github.com/arslankaleem7229/Protosigning/blob/master/Screenshots/7.PNG)
![Figure: Dashboard](https://github.com/arslankaleem7229/Protosigning/blob/master/Screenshots/8.PNG)
![Figure: New Project](https://github.com/arslankaleem7229/Protosigning/blob/master/Screenshots/9.PNG)
![Figure: Web Designing Toolkit](https://github.com/arslankaleem7229/Protosigning/blob/master/Screenshots/10.PNG)
![Figure: Logo Designing Toolkit](https://github.com/arslankaleem7229/Protosigning/blob/master/Screenshots/11.PNG)
![Figure: Linking Webpages](https://github.com/arslankaleem7229/Protosigning/blob/master/Screenshots/12.PNG)
![Figure: Web Templates](https://github.com/arslankaleem7229/Protosigning/blob/master/Screenshots/13.PNG)
![Figure: Workspace](https://github.com/arslankaleem7229/Protosigning/blob/master/Screenshots/14.PNG)
![Figure: Code generation Panel](https://github.com/arslankaleem7229/Protosigning/blob/master/Screenshots/15.PNG)
![Figure: Sample Logo](https://github.com/arslankaleem7229/Protosigning/blob/master/Screenshots/16.PNG)
![Figure: Layers of sample logo](https://github.com/arslankaleem7229/Protosigning/blob/master/Screenshots/17.PNG)
![Figure: Sample logo 2](https://github.com/arslankaleem7229/Protosigning/blob/master/Screenshots/18.PNG)
![Figure: SVG code of sample logo 2](https://github.com/arslankaleem7229/Protosigning/blob/master/Screenshots/19.PNG)
 
