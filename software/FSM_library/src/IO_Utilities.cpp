
#include "IO_Utilities.h"

using namespace std;

/*
 * @brief Prints an Automaton to a file stream
 * @param automaton The automaton to be printed
 * @param outfile The file stream to be written
 */
void IO_Utilities::PrintAutomatonToFile(const Automaton & automaton, std::ostream & outfile)
{	
  //Print the number of states
	outfile << automaton.GetNumberOfStates() << endl << endl;
	
  //Loop through states
	for(int i=0; i<automaton.GetNumberOfStates(); i++)
	{
    //Print the state name
	  outfile << automaton.States[i]->Name << " ";

    //Print 1 if the state is proper, 0 otherwise
    outfile << (automaton.States[i]->isProper ? 1 : 0) << " ";
		
    //Print the number of transitions
		outfile << automaton.States[i]->Transitions.size() << endl;

    //Loop through all the events
		for(multimap<std::string,State*>::const_iterator it = automaton.States[i]->Transitions.begin();
        it != automaton.States[i]->Transitions.end(); it++)
		{
      //Print the transitions
		  outfile << it->first << "\t";
		  outfile << (it->second)->Name << " c o" << endl;
		}
		outfile << endl;
	}
}


/*
 * @brief Used for writing to a .fsm file
 * @note For conventional fsm format, use UMDES_PRINT_FORMAT
 *
void IO_Utilities::WriteStateToFile( EncodedStateType currentState, 
                                     vector<CompositeTransition> & nextStates, 
                                     bool marked, 
                                     ofstream & outfile, 
                                     StateEncoder & encoder, 
                                     pair<EventTypeMask,string> specialEvent, 
                                     string & titleAppend)
{
  /****************For use with UMDES conventions **********************
   *
   * State names are the encoded value (to fit length requirement)
   * Only the intial state (state 0) is marked
   *
  if(UMDES_PRINT_FORMAT)
  {
    outfile << hex << setw(8) << setfill('0') <<  currentState;
    outfile << titleAppend << "\t"; //State name
    outfile << (currentState?0:1) << "\t";        //Marked
    outfile << dec << nextStates.size() << "\t" << endl; //Number of transitions
    
    for(int i=0; i<nextStates.size(); i++)
    {
      if(nextStates[i].mask != NO_EVENTS_MASK)
      {
        outfile << nextStates[i].event;
        outfile << "\t"<< hex << setw(8) << setfill('0') << nextStates[i].dest;
        if(nextStates[i].mask == specialEvent.first)
        {
          outfile << specialEvent.second;
        }
        outfile << "\t";
        outfile << "c\to" << endl;
      }
    }
  }
  /*******************************************************************/

  /***** MODE 2 - For use with our conventions ***********************
   * 
   * Full state name is used (component state names separated,by,commas)
   * A state is marked IFF all of it's component states are marked
   *
  if(SPECIAL_EVENTS_FORMAT)
  {
    outfile << encoder.GenerateStateName( currentState ) << titleAppend << "\t";
    outfile << (marked?1:0) << "\t"; 
    outfile << nextStates.size() << "\t" << endl;
    
    for(int i=0; i<nextStates.size(); i++)
    {
      if(nextStates[i].mask != NO_EVENTS_MASK)
      {
        outfile << nextStates[i].event << "\t";
        outfile << encoder.GenerateStateName( nextStates[i].dest );
        if(nextStates[i].mask == specialEvent.first)
        {
          outfile << specialEvent.second;
        }
        outfile << "\t";
        outfile << "c\to" << endl;
      }
    } 
  }
  /*******************************************************************
  
  outfile << endl;
  outfile.flush();
}
*/
/*
 * @brief Add a state to an FSM_struct
 *
void IO_Utilities::AddStateToFSM( EncodedStateType currentState, 
                                  vector<CompositeTransition> & nextStates, 
                                  bool marked, 
                                  FSM_struct * fsm, 
                                  StateEncoder & encoder, 
                                  pair<EventTypeMask,string> specialEvent, 
                                  string & titleAppend)
{
  //Name state
  string statename = encoder.GenerateStateName(currentState); 
  statename += titleAppend;
  
  //Get (or assign) state index  
  int stateindex = fsm->getStateIndex(statename);
  fsm->states[stateindex].marked = marked;
  
  //Populate with transitions
  for(int i=0; i<nextStates.size(); i++)
  {
    if(nextStates[i].mask != NO_EVENTS_MASK)
    {
      string nextname = encoder.GenerateStateName( nextStates[i].dest );
      if(nextStates[i].mask == specialEvent.first)
      {
        nextname += specialEvent.second;
      }
      
      Trans trans;
      trans.event = nextStates[i].event;
      trans.dest = fsm->getStateIndex(nextname);
      trans.obs = true;
      trans.con = true;
      
      //Add eventName to alphabet if necessary
      fsm->addEvent(trans.event);
			
      fsm->states[stateindex].transitions.push_back(trans); 
    }
  } 
}
*/

/*
 * @brief Extract the fsm name from a filepath
 */
string IO_Utilities::GetNameFromPath (const std::string& filepath)
{
  unsigned slashPos = filepath.find_last_of("/\\");
  unsigned extensionPos = filepath.find_last_of(".");
  
  return filepath.substr(slashPos+1, extensionPos-slashPos - 1);
}

/*
 * @brief Reads a .fsm file into an Automaton structure
 * @param automaton The automaton to be populated
 * @param filepath The file path of the file to be read from
 * @returns true if was successful, false otherwise
 */
bool IO_Utilities::ReadFsmFileIntoAutomaton(Automaton & automaton, const std::string filepath)
{	
  //If the FSM is not empty, return with an error
  if(automaton.States.size() || automaton.Events.size())
  {
    cout << "readFSM: Automaton passed is is not empty. Exiting." << endl;
    return false;
  }
  
  //Open up file, error check
  ifstream infile;
  infile.open(filepath.c_str());
  if(infile.fail())
  {
    cout << "readFSM: "<< filepath << " does not exist in this directory. Exiting." << endl;
    return false;
  }
  
  //Get number of states
  int numStates;
  string junk;
  infile >> numStates;
  getline(infile, junk); 

  //Loop through states
  for(int i=0; i<numStates; i++)
  {
    //If anything has gone wrong, stop reading and exit
    if(!infile.good())
    {
      cout << "readFSM: Failed to parse " << filepath << ". Exiting." << endl;
      infile.close(); 
      return false;
    }
    
    //Read in state name
    string stateName;
    infile >> stateName;
cout << "READING IN " << stateName << endl;
    //Get pointer to this state
    State * ThisStatePtr = automaton.GetStatePointer(stateName);
    infile >> ThisStatePtr->isProper;
    
    //Read in number of transitions and loop through them   
    int numTransIn;
    infile >> numTransIn;
cout << numTransIn << " TRANSITIONS!!!" << endl;
    for(int j=0; j<numTransIn; j++)
    {
      //Create new transistion from each line
      string event, nextstate, c, o;
      infile >> event >> nextstate >> c >> o;
      
      //Get the state index associated with this state
      cout << ThisStatePtr->Transitions.size() << " trans at " << ThisStatePtr->Name << endl;
      State * NextStatePtr = automaton.GetStatePointer(nextstate);
      
      //Add eventName to alphabet
      automaton.AddEvent(event);
    
      //Add transition to state
      ThisStatePtr->AddTransition(event, NextStatePtr);	
    }

    //Get whatever junk exists at end of line
    getline(infile, junk);
  }	
  
  //Close out the file
  infile.close();	
	
  return true;
}

/*
 * @brief Inverts the transitions from each FSM in FSMArray and inserts the new FSM in FSMArray_inv
 *
void IO_Utilities::InvertTransitions( const vector<FSM_struct>& FSMArray, vector<FSM_struct>& FSMArray_inv)
{
  //Invert transitions, making new FSMs
  
  for(int i=0; i<FSMArray.size(); i++)
  {
    FSM_struct inv;
    inv.fsmName = FSMArray[i].fsmName + "_inv";
    inv.numEvents = FSMArray[i].numEvents;
    inv.alphabet = FSMArray[i].alphabet;
    for(int j=0; j<FSMArray[i].GetNumberOfStates(); j++)
    {
      State state_inv(FSMArray[i].states[j].stateName);
      state_inv.marked = FSMArray[i].states[j].marked;
      inv.states.push_back(state_inv);
    }
    
    for(int j=0; j<inv.GetNumberOfStates(); j++)
    {
      for(int k=0; k<FSMArray[i].states[j].GetNumberOfTransitions(); k++)
      {
        Trans trans_inv;
        int newSource = FSMArray[i].states[j].transitions[k].dest;
        trans_inv.event = FSMArray[i].states[j].transitions[k].event;
        trans_inv.con = FSMArray[i].states[j].transitions[k].con;
        trans_inv.con = FSMArray[i].states[j].transitions[k].obs;
        trans_inv.dest = j;
        inv.states[newSource].transitions.push_back(trans_inv);
      }
    }
    FSMArray_inv.push_back(inv);
  }
}
*/
