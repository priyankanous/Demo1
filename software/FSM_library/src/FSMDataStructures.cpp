#include <FSMDataStructures.h>

using namespace std;

/*
 * @brief Constructor
 * @param name FSM name
 */
Automaton::Automaton(const std::string & name)
{
  //Assign the name to the FSM
  Name = name;
}

/*
 * @brief Adds an event to the event set of the automaton
 * @param event The event to be added
 */
void Automaton::AddEvent(const std::string & event)
{
  //Add the event to the set
  this->Events.insert(event);
}

/*
 * @brief Guaranteed to return the pointer to the state that has the desired statename
 * @note If the state does not yet exist, one is created and that pointer is returned
 * @param statename The name of the desired state
 * @returns The pointer to the desired state
 */
State * Automaton::GetStatePointer(const std::string & statename)
{
  //Linear search through the set of states
  for(vector<State *>::iterator it = States.begin(); it != States.end(); it++)
  {
    //Check if the names match
	  if(!statename.compare((*it)->Name))
	  {
      //Return the pointer to the state
		  return (*it);
	  }
  }

  //The state wasn't found. Make a new one and push it
  State * newstate = new State(statename);
  States.push_back(newstate);
  
  //Insert the state and return a pointer to the new copy
  return newstate;
}

/*
 * @brief Gets the number of states in the set of states
 * @returns The size of the set of states
 */
int Automaton::GetNumberOfStates(void) const
{
  //Return the size of the set of states
  return States.size();
}

/*
 * @brief Removes all state and event data
 */
void Automaton::Clear(void)
{
  //Clear the states, events, and name
  for(vector<State *>::iterator it = States.begin(); it != States.end(); it++)
  {
    delete *it;
  }
  States.clear();
  Events.clear();
  Name.clear();
}


/*
Event_obj::Event_obj()
	:valid(0),
	FSMcount(0) 
{};
		
		
Event_obj::Event_obj(string& name, int fsm, int dest)
	:valid(0),
	FSMcount(1),
	event(name)
{
	pair<int,int> mypair(fsm, dest);
	transitions.push_back(mypair);
};	
	*/	
    	
