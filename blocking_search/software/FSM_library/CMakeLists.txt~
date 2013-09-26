file(GLOB sources_localdir src/*.cpp)

include_directories(
  ${CMAKE_CURRENT_SOURCE_DIR}/inc
)

set(FSM_Library_Sources
  ${sources_localdir}
)

add_library(FSM_library STATIC ${FSM_Library_Sources})

set_target_properties(FSM_library PROPERTIES LINKER_LANGAUGE CXX)



