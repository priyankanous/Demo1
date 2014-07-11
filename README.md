cloaked-archer
==============

This is the repository for the UMDES on-the-fly parallel composition technique.

To access, modify, build, and use the code, follow the instructions below:

0) Optional - Install kdevelop in your Linux environment. This IDE has great support for CMake.
EXAMPLE: lanham@lanham-G750JX: $ sudo apt-get install kdevelop

1) Install git if it is not already installed.
EXAMPLE: lanham@lanham-G750JX: $ sudo apt-get install git

2) In a Linux environment, enter a directory where you would like to clone the file structure
EXAMPLE: lanham@lanham-G750JX: $ mkdir TRW
EXAMPLE: lanham@lanham-G750JX: $ cd TRW

3) Clone the remote repositoty onto your machine
EXAMPLE: lanham@lanham-G750JX: $ git clone http://github.com/0s4l/cloaked-archer

4) Enter the build directory, and invoke cmake to update the makefile for the project.
EXAMPLE: lanham@lanham-G750JX $ cd cloaked-archer/blocking_search/build
EXAMPLE: lanham@lanham-G750JX $ cmake ..
EXAMPLE: lanham@lanham-G750JX $ make

5) Enter the main directory. Executables have been written to bin/. Use -h flags for information
EXAMPLE: lanham@lanham-G750JX: $ cd ..
EXAMPLE: lanham@lanham-G750JX: $ ./bin/BlockingSearch -h

6) FSM files are: FSM_files/abstracted/*.fsm and FSM_files/SpecialCase/faultFSM-no_typo.fsm
EXAMPLE: lanham@lanham-G750JX: $ ./bin/BlockingSearch -v FSM_files/abstracted/*.fsm FSM_files/SpecialCase/faultFSM-no_typo.fsm 

7) Outputs will appear in the directory from which the call was made.

test! test2!
