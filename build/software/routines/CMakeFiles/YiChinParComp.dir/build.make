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
include software/routines/CMakeFiles/YiChinParComp.dir/depend.make

# Include the progress variables for this target.
include software/routines/CMakeFiles/YiChinParComp.dir/progress.make

# Include the compile flags for this target's objects.
include software/routines/CMakeFiles/YiChinParComp.dir/flags.make

software/routines/CMakeFiles/YiChinParComp.dir/src/main.cpp.o: software/routines/CMakeFiles/YiChinParComp.dir/flags.make
software/routines/CMakeFiles/YiChinParComp.dir/src/main.cpp.o: ../software/routines/src/main.cpp
	$(CMAKE_COMMAND) -E cmake_progress_report /home/lanham/TRW_new_2/blocking_search/build/CMakeFiles $(CMAKE_PROGRESS_1)
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Building CXX object software/routines/CMakeFiles/YiChinParComp.dir/src/main.cpp.o"
	cd /home/lanham/TRW_new_2/blocking_search/build/software/routines && /usr/bin/c++   $(CXX_DEFINES) $(CXX_FLAGS) -o CMakeFiles/YiChinParComp.dir/src/main.cpp.o -c /home/lanham/TRW_new_2/blocking_search/software/routines/src/main.cpp

software/routines/CMakeFiles/YiChinParComp.dir/src/main.cpp.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Preprocessing CXX source to CMakeFiles/YiChinParComp.dir/src/main.cpp.i"
	cd /home/lanham/TRW_new_2/blocking_search/build/software/routines && /usr/bin/c++  $(CXX_DEFINES) $(CXX_FLAGS) -E /home/lanham/TRW_new_2/blocking_search/software/routines/src/main.cpp > CMakeFiles/YiChinParComp.dir/src/main.cpp.i

software/routines/CMakeFiles/YiChinParComp.dir/src/main.cpp.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Compiling CXX source to assembly CMakeFiles/YiChinParComp.dir/src/main.cpp.s"
	cd /home/lanham/TRW_new_2/blocking_search/build/software/routines && /usr/bin/c++  $(CXX_DEFINES) $(CXX_FLAGS) -S /home/lanham/TRW_new_2/blocking_search/software/routines/src/main.cpp -o CMakeFiles/YiChinParComp.dir/src/main.cpp.s

software/routines/CMakeFiles/YiChinParComp.dir/src/main.cpp.o.requires:
.PHONY : software/routines/CMakeFiles/YiChinParComp.dir/src/main.cpp.o.requires

software/routines/CMakeFiles/YiChinParComp.dir/src/main.cpp.o.provides: software/routines/CMakeFiles/YiChinParComp.dir/src/main.cpp.o.requires
	$(MAKE) -f software/routines/CMakeFiles/YiChinParComp.dir/build.make software/routines/CMakeFiles/YiChinParComp.dir/src/main.cpp.o.provides.build
.PHONY : software/routines/CMakeFiles/YiChinParComp.dir/src/main.cpp.o.provides

software/routines/CMakeFiles/YiChinParComp.dir/src/main.cpp.o.provides.build: software/routines/CMakeFiles/YiChinParComp.dir/src/main.cpp.o

# Object files for target YiChinParComp
YiChinParComp_OBJECTS = \
"CMakeFiles/YiChinParComp.dir/src/main.cpp.o"

# External object files for target YiChinParComp
YiChinParComp_EXTERNAL_OBJECTS =

../bin/YiChinParComp: software/routines/CMakeFiles/YiChinParComp.dir/src/main.cpp.o
../bin/YiChinParComp: software/routines/CMakeFiles/YiChinParComp.dir/build.make
../bin/YiChinParComp: software/FSM_library/libFSM_library.a
../bin/YiChinParComp: software/routines/CMakeFiles/YiChinParComp.dir/link.txt
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --red --bold "Linking CXX executable ../../../bin/YiChinParComp"
	cd /home/lanham/TRW_new_2/blocking_search/build/software/routines && $(CMAKE_COMMAND) -E cmake_link_script CMakeFiles/YiChinParComp.dir/link.txt --verbose=$(VERBOSE)

# Rule to build all files generated by this target.
software/routines/CMakeFiles/YiChinParComp.dir/build: ../bin/YiChinParComp
.PHONY : software/routines/CMakeFiles/YiChinParComp.dir/build

software/routines/CMakeFiles/YiChinParComp.dir/requires: software/routines/CMakeFiles/YiChinParComp.dir/src/main.cpp.o.requires
.PHONY : software/routines/CMakeFiles/YiChinParComp.dir/requires

software/routines/CMakeFiles/YiChinParComp.dir/clean:
	cd /home/lanham/TRW_new_2/blocking_search/build/software/routines && $(CMAKE_COMMAND) -P CMakeFiles/YiChinParComp.dir/cmake_clean.cmake
.PHONY : software/routines/CMakeFiles/YiChinParComp.dir/clean

software/routines/CMakeFiles/YiChinParComp.dir/depend:
	cd /home/lanham/TRW_new_2/blocking_search/build && $(CMAKE_COMMAND) -E cmake_depends "Unix Makefiles" /home/lanham/TRW_new_2/blocking_search /home/lanham/TRW_new_2/blocking_search/software/routines /home/lanham/TRW_new_2/blocking_search/build /home/lanham/TRW_new_2/blocking_search/build/software/routines /home/lanham/TRW_new_2/blocking_search/build/software/routines/CMakeFiles/YiChinParComp.dir/DependInfo.cmake --color=$(COLOR)
.PHONY : software/routines/CMakeFiles/YiChinParComp.dir/depend

