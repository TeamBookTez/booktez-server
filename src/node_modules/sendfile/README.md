
##Sendfile
Sendfile is a zero-config command line tool for sending files between two computers on a network.

###Installation
```shell
$ npm install -g sendfile
```

###Usage
In the shell on the source computer:

```shell
$ sendfile <path-to-file>
```


And on the destination computer:

```shell
$ getfile
```

####Usage Notes
Currently, sendfile can only send single files.  To send a directory, zip it up!

The source path can be absolute or relative.  The destination path is in the current working directory (`.`).

It does not matter which computer executes its respective command first.  From the time one is executed, the other must be executed within fifteen seconds.

The transfer is intended to work between 2 computers only:  A source computer and a destination computer.

####Security Notes
NB  \*\*This beta version does not implement secure file transfers nor does it have secure pairing.\*\*   Use with caution.  Insecure for sensitive documents.

#####Licence
MIT


This is a project I completed as a student at [Hack Reactor](http://hackreactor.com). 
