file(GLOB sources_localdir src/*.cpp)

include_directories(
  ${CMAKE_CURRENT_SOURCE_DIR}/../FSM_library/inc
  ${CMAKE_CURRENT_SOURCE_DIR}/inc
)

set(test_Sources
  ${sources_localdir}
)
SET(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -std=c++0x")

add_definitions(-DPARAM_IN=13)

add_executable(BlockingSearch src/blocking.cpp)

target_link_libraries(BlockingSearch
  FSM_library
)

add_executable(FSMsort src/sortFSM.cpp)
target_link_libraries(FSMsort
FSM_library
)

add_executable(PrintParComp src/printParComp.cpp)
target_link_libraries(PrintParComp
  FSM_library
)

add_executable(DivideEvents src/division.cpp)
target_link_libraries(DivideEvents
  FSM_library
)

set(EXECUTABLE_OUTPUT_PATH ${CMAKE_SOURCE_DIR}/bin)


set_target_properties(BlockingSearch PROPERTIES LINKER_LANGUAGE CXX)


