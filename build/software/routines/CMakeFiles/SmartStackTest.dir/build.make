# CMAKE generated file: DO NOT EDIT!
# Generated by "Unix Makefiles" Generator, CMake Version 2.8

#=============================================================================
# Special targets provided by cmake.

# Disable implicit rules so canonical targets will work.
.SUFFIXES:

# Remove some rules from gmake that .SUFFIXES does not remove.
SUFFIXES =

.SUFFIXES: .hpux_make_needs_suffix_list

# Suppress display of executed commands.
$(VERBOSE).SILENT:

# A target that is always out of date.
cmake_force:
.PHONY : cmake_force

#=============================================================================
# Set environment variables for the build.

# The shell in which to execute make rules.
SHELL = /bin/sh

# The CMake executable.
CMAKE_COMMAND = /usr/bin/cmake

# The command to remove a file.
RM = /usr/bin/cmake -E remove -f

# Escaping for special characters.
EQUALS = =

# The top-level source directory on which CMake was run.
CMAKE_SOURCE_DIR = /home/lanham/TRW_new_2/blocking_search

# The top-level build directory on which CMake was run.
CMAKE_BINARY_DIR = /home/lanham/TRW_new_2/blocking_search/build

# Include any dependencies generated for this target.
include software/routines/CMakeFiles/SmartStackTest.dir/depend.make

# Include the progress variables for this target.
include software/routines/CMakeFiles/SmartStackTest.dir/progress.make

# Include the compile flags for this target's objects.
include software/routines/CMakeFiles/SmartStackTest.dir/flags.make

software/routines/CMakeFiles/SmartStackTest.dir/src/SmartStackTest.cpp.o: software/routines/CMakeFiles/SmartStackTest.dir/flags.make
software/routines/CMakeFiles/SmartStackTest.dir/src/SmartStackTest.cpp.o: ../software/routines/src/SmartStackTest.cpp
	$(CMAKE_COMMAND) -E cmake_progress_report /home/lanham/TRW_new_2/blocking_search/build/CMakeFiles $(CMAKE_PROGRESS_1)
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Building CXX object software/routines/CMakeFiles/SmartStackTest.dir/src/SmartStackTest.cpp.o"
	cd /home/lanham/TRW_new_2/blocking_search/build/software/routines && /usr/bin/c++   $(CXX_DEFINES) $(CXX_FLAGS) -o CMakeFiles/SmartStackTest.dir/src/SmartStackTest.cpp.o -c /home/lanham/TRW_new_2/blocking_search/software/routines/src/SmartStackTest.cpp

software/routines/CMakeFiles/SmartStackTest.dir/src/SmartStackTest.cpp.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Preprocessing CXX source to CMakeFiles/SmartStackTest.dir/src/SmartStackTest.cpp.i"
	cd /home/lanham/TRW_new_2/blocking_search/build/software/routines && /usr/bin/c++  $(CXX_DEFINES) $(CXX_FLAGS) -E /home/lanham/TRW_new_2/blocking_search/software/routines/src/SmartStackTest.cpp > CMakeFiles/SmartStackTest.dir/src/SmartStackTest.cpp.i

software/routines/CMakeFiles/SmartStackTest.dir/src/SmartStackTest.cpp.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Compiling CXX source to assembly CMakeFiles/SmartStackTest.dir/src/SmartStackTest.cpp.s"
	cd /home/lanham/TRW_new_2/blocking_search/build/software/routines && /usr/bin/c++  $(CXX_DEFINES) $(CXX_FLAGS) -S /home/lanham/TRW_new_2/blocking_search/software/routines/src/SmartStackTest.cpp -o CMakeFiles/SmartStackTest.dir/src/SmartStackTest.cpp.s

software/routines/CMakeFiles/SmartStackTest.dir/src/SmartStackTest.cpp.o.requires:
.PHONY : software/routines/CMakeFiles/SmartStackTest.dir/src/SmartStackTest.cpp.o.requires

software/routines/CMakeFiles/SmartStackTest.dir/src/SmartStackTest.cpp.o.provides: software/routines/CMakeFiles/SmartStackTest.dir/src/SmartStackTest.cpp.o.requires
	$(MAKE) -f software/routines/CMakeFiles/SmartStackTest.dir/build.make software/routines/CMakeFiles/SmartStackTest.dir/src/SmartStackTest.cpp.o.provides.build
.PHONY : software/routines/CMakeFiles/SmartStackTest.dir/src/SmartStackTest.cpp.o.provides

software/routines/CMakeFiles/SmartStackTest.dir/src/SmartStackTest.cpp.o.provides.build: software/routines/CMakeFiles/SmartStackTest.dir/src/SmartStackTest.cpp.o

# Object files for target SmartStackTest
SmartStackTest_OBJECTS = \
"CMakeFiles/SmartStackTest.dir/src/SmartStackTest.cpp.o"

# External object files for target SmartStackTest
SmartStackTest_EXTERNAL_OBJECTS =

../bin/SmartStackTest: software/routines/CMakeFiles/SmartStackTest.dir/src/SmartStackTest.cpp.o
../bin/SmartStackTest: software/routines/CMakeFiles/SmartStackTest.dir/build.make
../bin/SmartStackTest: software/FSM_library/libFSM_library.a
../bin/SmartStackTest: software/routines/CMakeFiles/SmartStackTest.dir/link.txt
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --red --bold "Linking CXX executable ../../../bin/SmartStackTest"
	cd /home/lanham/TRW_new_2/blocking_search/build/software/routines && $(CMAKE_COMMAND) -E cmake_link_script CMakeFiles/SmartStackTest.dir/link.txt --verbose=$(VERBOSE)

# Rule to build all files generated by this target.
software/routines/CMakeFiles/SmartStackTest.dir/build: ../bin/SmartStackTest
.PHONY : software/routines/CMakeFiles/SmartStackTest.dir/build

software/routines/CMakeFiles/SmartStackTest.dir/requires: software/routines/CMakeFiles/SmartStackTest.dir/src/SmartStackTest.cpp.o.requires
.PHONY : software/routines/CMakeFiles/SmartStackTest.dir/requires

software/routines/CMakeFiles/SmartStackTest.dir/clean:
	cd /home/lanham/TRW_new_2/blocking_search/build/software/routines && $(CMAKE_COMMAND) -P CMakeFiles/SmartStackTest.dir/cmake_clean.cmake
.PHONY : software/routines/CMakeFiles/SmartStackTest.dir/clean

software/routines/CMakeFiles/SmartStackTest.dir/depend:
	cd /home/lanham/TRW_new_2/blocking_search/build && $(CMAKE_COMMAND) -E cmake_depends "Unix Makefiles" /home/lanham/TRW_new_2/blocking_search /home/lanham/TRW_new_2/blocking_search/software/routines /home/lanham/TRW_new_2/blocking_search/build /home/lanham/TRW_new_2/blocking_search/build/software/routines /home/lanham/TRW_new_2/blocking_search/build/software/routines/CMakeFiles/SmartStackTest.dir/DependInfo.cmake --color=$(COLOR)
.PHONY : software/routines/CMakeFiles/SmartStackTest.dir/depend

