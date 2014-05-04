
#include "IO_Utilities.h"

using namespace std;

/* 
 * @brief Prints the FSM to outfile
 * @param verbose If true, content will be in human-readable form. Otherwise, will be in .fsm format
 */
void IO_Utilities::printFSM(FSM_struct & FSM, ostream & outfile, bool verbose)
{	
  if(verbose) outfile << FSM.fsmName << endl;
	
	outfile << FSM.GetNumberOfStates();
	if(verbose) outfile << " states.";
	outfile << endl << endl;
	
	for(int i=0; i<FSM.GetNumberOfStates(); i++)
	{
	  outfile << FSM.states[i].stateName;
	  if(verbose)
	  {
	    string markedStatus = (FSM.states[i].marked ? "marked" : "unmarked");
		  outfile << " - "  << markedStatus << endl;
		}
		else
		{
		  outfile << " " << (FSM.states[i].marked ? 1 : 0) << " ";
		}
		outfile << FSM.states[i].transitions.size() << (verbose?" transitions":"") << endl;
		for(int j=0; j < FSM.states[i].transitions.size(); j++)
		{
		  outfile << FSM.states[i].transitions[j].event << "\t";
		  outfile << FSM.states[FSM.states[i].transitions[j].dest].stateName << " c o" << endl;
		}
		outfile << endl;
	}
}

/*
 * @brief Used for writing to a .fsm file
 * @note For conventional fsm format, use UMDES_PRINT_FORMAT
 */
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
   */
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
   */
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
  /*******************************************************************/
  
  outfile << endl;
  outfile.flush();
}

/*
 * @brief Add a state to an FSM_struct
 */
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
 * @brief Reads each of the included .fsm files into a FSM_struct. Adds these to a vector of FSM_structs
 * @param FSMArray Vector of FSMs.
 * @param print True if verbose output is desired
 * @param argc Number of command line args
 * @param argv Command line args
 */

void IO_Utilities::readFSM(vector<FSM_struct>& FSMArray, bool print, int argc, char* argv[])
{	
	//Loop through input FSM files, read into structs
	for(int filenum=1; filenum<argc; filenum++)
	{
		//Open up fsm
		ifstream infile;
		infile.open(argv[filenum]);
		if(infile.fail()){
			cout<<argv[filenum]<<" does not exist in this directory. Exiting.\n";
			exit(1);
		}
		int numStates;
		string junk;
		infile >> numStates;
		getline(infile, junk); 
	
		//Build FSM Struct
		FSM_struct FSM1;
		string name = argv[filenum];
		FSM1.fsmName = GetNameFromPath(name);
	
		//Loop through states
		for(int i=0; i<numStates; i++){
			//Read in state name
			string stateName;
			infile >> stateName;
		
			//Find state entry for this state, insert if necessary 
			int stateindex = FSM1.getStateIndex(stateName);
			infile >> FSM1.states[stateindex].marked;
			
			int numTransIn;
			infile >> numTransIn;
		
			//Loop for events
			for(int j=0; j<numTransIn; j++){
				//Create new transistion, fill from file
				Trans newtrans;
				string dest;
				string c, o;
				infile >> newtrans.event >> dest >> c >> o;
				if(!c.compare("c"))
					newtrans.con = 1;
				else
					newtrans.con = 0;
				if(!o.compare("o"))
					newtrans.obs = 1;
				else
					newtrans.obs = 0;
				
				newtrans.dest = FSM1.getStateIndex(dest);
			
				//Add eventName to alphabet if necessary
				FSM1.addEvent(newtrans.event);
			
				//Add transition to state
				FSM1.states[stateindex].transitions.push_back(newtrans);	
			}
	
			getline(infile, junk);
		}	
		infile.close();	
		FSMArray.push_back(FSM1);
	}
	
	//Print update
	if(print)
	{
	  cout<<FSMArray.size()<<" automata read in: "<<endl;
	  unsigned long int worstcase = 1;

	  for(int i=0; i<FSMArray.size(); i++)
	  {
		  cout<<FSMArray[i].fsmName<<"\t"<<FSMArray[i].GetNumberOfStates()<<" states\t";
		  cout<<FSMArray[i].numEvents<<" events\t";
		  cout<<ceil(log2(FSMArray[i].GetNumberOfStates()))<<" bits\n";
		  worstcase *= FSMArray[i].GetNumberOfStates();
	  }

		cout<<"Worst case (shuffle) is "<<worstcase;
		cout<<" states after parallel composition."<<endl;
	}
}

/*
 * @brief Inverts the transitions from each FSM in FSMArray and inserts the new FSM in FSMArray_inv
 */
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










