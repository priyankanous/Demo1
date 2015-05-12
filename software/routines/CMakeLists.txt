file(GLOB sources_localdir)


include_directories(
  ${CMAKE_CURRENT_SOURCE_DIR}/../FSM_library/inc
  ${CMAKE_CURRENT_SOURCE_DIR}/inc
)

set(test_Sources
  ${sources_localdir}
)
SET(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -std=c++0x")

# add_definitions(-DPARAM_IN=13)

# add_executable(BlockingSearch src/blocking.cpp)
# target_link_libraries(BlockingSearch
#   FSM_library
# )

# add_executable(FSMsort src/sortFSM.cpp)
# target_link_libraries(FSMsort
# FSM_library
# )

# add_executable(PrintParComp src/printParComp.cpp)
# target_link_libraries(PrintParComp
#   FSM_library
# )

# add_executable(DivideEvents src/division.cpp)
# target_link_libraries(DivideEvents
#   FSM_library
# )

# add_executable(CreateSpecialAutomata src/createSpecialAutomata.cpp)
# target_link_libraries(CreateSpecialAutomata
#   FSM_library
# )

#add_executable(YiChinParComp src/main.cpp)
#target_link_libraries(YiChinParComp
#  FSM_library
#)

add_executable(RunAutoTests src/automated_tests.cpp)
target_link_libraries(RunAutoTests
  FSM_library
)

add_executable(CountBlockingStates src/countBlockingStates.cpp)
target_link_libraries(CountBlockingStates
  FSM_library
)

add_executable(RawCountBlockingStates src/RawCountBlockingStates.cpp)
target_link_libraries(RawCountBlockingStates
  FSM_library
)

add_executable(InvertAutomata src/InvertTransitions.cpp)
target_link_libraries(InvertAutomata
  FSM_library
)

add_executable(CompareAutomata src/CompareAutomata.cpp)
target_link_libraries(CompareAutomata
  FSM_library
)

set(EXECUTABLE_OUTPUT_PATH ${CMAKE_SOURCE_DIR}/bin)


# set_target_properties(BlockingSearch PROPERTIES LINKER_LANGUAGE CXX)


