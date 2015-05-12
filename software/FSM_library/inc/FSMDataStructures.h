#ifndef _FSM_DATA_STRUCTURES_H_
#define _FSM_DATA_STRUCTURES_H_

#include <iostream>
#include <fstream>
#include <vector>
#include <string>
#include <map>
#include <utility>
#include <algorithm>
#include <stack>
#include <bitset>
#include <cmath>
#include <set>
#include <unordered_set>


///@brief A state in a finite state machine
class State
{
private:
  ///@brief Restrict the default constructor from being used
  State(void);

public:
  ///@brief The state's name
	std::string Name;
  
  ///@brief True if the state is proper
  bool isProper;

  ///@brief Transition table - Key is the event, the values are the associated transtions
	std::multimap<std::string, State * > Transitions;

  /*
   * @brief Constructor
   * @param statename The state's name
   */
  State(const std::string statename)
    :Name(statename) {};
  
  /*
   * @brief Adds a transition to the transition table
   * @param event The associated event
   * @param destination The destination state
   */
  void AddTransition(const std::string event, State * destination)
  { 
    this->Transitions.insert(make_pair(event, destination));
    std::cout << Transitions.size() << " transitions at this state." << std::endl;
  };


  /*
   * @brief Gets the number of transitions in a state
   * @returns The number of transitions
   */
  int GetNumberOfTransitions(void) const
  {
    return this->Transitions.size();
  }	
};

///@brief A class which represents an automaton
class Automaton
{
private:
  ///@brief Restrict the default constructor from being used
  Automaton(void);

public:
  ///@brief The name of the automaton
	std::string Name;

  ///@brief The set of events in the automaton
	std::set<std::string> Events;

  ///@brief The set of states in the automaton
	std::vector<State *> States;

  /*
   * @brief Constructor
   * @param name The name to be assigned to the automaton
   */
  Automaton(const std::string & name);

  /*
   * @brief Adds an event to the event set of the automaton
   * @param event The event to be added
   */
	void AddEvent(const std::string & event);

  /*
   * @brief Guaranteed to return the pointer to the state that has the desired statename
   * @note If the state does not yet exist, one is created and that pointer is returned
   * @param statename The name of the desired state
   * @returns The pointer to the desired state
   */
	State * GetStatePointer(const std::string & statename);

  /*
   * @brief Gets the number of states in the set of states
   * @returns The size of the set of states
   */
	int GetNumberOfStates(void) const;

  /*
   * @brief Removes all state and event data.
   */
  void Clear(void);
};



/*
 * Keeps track of all events of same name at all current states
 *
struct Event_obj{
	std::string event;
	bool valid;
	int FSMcount;
	std::vector<std::pair<int, int> > transitions;
	
	Event_obj();
	Event_obj(std::string& name, int fsm, int dest);
};
*/

#endif
