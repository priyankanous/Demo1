file(GLOB sources_localdir 
     src/FSM.cpp 
     src/ParCompUtilities.cpp
     src/SmartStack.cpp
     src/TRWSpecialUtilities.cpp
     src/SmartHeap.cpp
     #src/IO_Utilities.cpp 
    )

include_directories(
  ${CMAKE_CURRENT_SOURCE_DIR}/inc
)

set(FSM_Library_Sources
  ${sources_localdir}
)

SET(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -std=c++0x")

add_library(FSM_library STATIC ${FSM_Library_Sources})

set_target_properties(FSM_library PROPERTIES LINKER_LANGAUGE CXX)



