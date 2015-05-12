
#include <Utilities.h>
#define MAX_BITS 10
#include <bitset>
using namespace std;

void GenerateOptimalSubgroups(vector<FSM_struct> & FSMArr)
{
	/* Optimization Parameters */
	long unsigned int BestMetricSoFar = -1;
	unsigned int BestMaskSoFar;
	
	unsigned int mask = 0;
	int NumberOfFSMs = FSMArr.size();
	
	vector<FSM_struct> Group1, Group2;
	
	for(unsigned int mask=0; mask < (1<<NumberOfFSMs); mask++)
	{
		/* Split FSM's into 2 groups for parallel composition */
		for(int i=0; i < NumberOfFSMs; i++)
		{
			if( (mask >> i) & 0x1 )
			{
				Group1.push_back(FSMArr[i]);
			}
			else 
			{
				Group2.push_back(FSMArr[i]);
			}
		}
		/***************************************************/
		
		
		/* Primary analytics on feasibility of computation */
		
		/***************************************************/
		
		
		
		/***** Run Parallel Compostion on Each Group ******/
		
		long unsigned int Size1 = 1;
		for(int i=0; i<Group1.size(); i++)
			Size1 *= Group1[i].numStates; // = ParComp();
			
		long unsigned int Size2 = 1;
		for(int i=0; i<Group2.size(); i++)
			Size2 *= Group2[i].numStates; // = ParComp();
			
		/***************************************************/
		
		
		
		
		/********** Compare Optimization Metric ************/
		long unsigned int Metric = Size1 * Size2 * ( 2 + ceil(log2(Size1)) + ceil(log2(Size2)) )/8;
		
		if(Metric < BestMetricSoFar)
		{
			BestMetricSoFar = Metric;
			BestMaskSoFar = mask;
			//system("mv test1.fsm best1.fsm");
			//system("mv test2.fsm best2.fsm");
		}
		/***************************************************/
		
		cout << bitset<10>(mask) << "\t";
		
		for(int i=0; i<Group1.size(); i++)
		{
			cout<<Group1[i].fsmName<<", ";
			
		}
		cout << "\t";
		for(int i=0; i<Group2.size(); i++)
		{
			cout<<Group2[i].fsmName<<", ";
			
		}
		cout << "\t";
		cout << Size1 << "\t" << Size2 << "\t" << hex<<Metric << endl;
		
		Group1.clear();
		Group2.clear();
	}
	
}

void printFSM(FSM_struct & FSM, std::string filepath)
{
	ofstream outfile;
	
	const char * fullPath = (filepath+"/"+FSM.fsmName+".fsm").c_str();
	outfile.open( fullPath );
	if(!outfile.is_open())
	{
		cout << (filepath + "/" + FSM.fsmName + ".fsm") << " did not open!" << endl;
		exit(1);
	}
	
	outfile << FSM.numStates<<endl<<endl;
	
	for(int i=0; i<FSM.numStates; i++)
	{
		printState(FSM, FSM.states[i], outfile);
	}
	
	outfile.close();
}

void printState(FSM_struct & FSM, State & state, ofstream & outfile)
{
	/* State name */
	outfile << state.stateName << "\t";
	
	/* Marked status */
	if(state.marked)
	{
		outfile << "1\t";
	}
	else
	{
		outfile << "0\t";
	}
	
	/* Transitions */
	outfile << state.numTrans<<endl;
	for(int j=0; j<state.numTrans; j++)
	{
		outfile << state.transitions[j].event<<"\t";
		outfile << FSM.states[state.transitions[j].dest].stateName<<"\t";
		outfile << "c\to\t";
		/*
		if (state.transitions[j].con)
			outfile << "c\t";
		else
			outfile << "uc\t";
		if (state.transitions[j].obs)
			outfile << "o\t";
		else
			outfile << "uo\t";	
		*/
		outfile << endl;
	}
}



string GetNameFromPath (const std::string& str)
{
  unsigned slashPos = str.find_last_of("/\\");
  unsigned extensionPos = str.find_last_of(".");
  
  return str.substr(slashPos+1, extensionPos-slashPos - 1);
}



int readFSM(vector<FSM_struct>& FSMArr, bool print, int argc, char* argv[]){	
	//Loop through input FSM files, read into structs
	for(int filenum=1; filenum<argc; filenum++){
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
		FSM_struct FSM1(numStates);
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
			infile >> FSM1.states[stateindex].numTrans;
		
			//Loop for events
			for(int j=0; j<FSM1.states[stateindex].numTrans; j++){
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
		FSMArr.push_back(FSM1);
	}
	
	//Print update
	if(print){cout<<FSMArr.size()<<" automata read in: "<<endl;}
	unsigned long int worstcase = 1;

	for(int i=0; i<FSMArr.size(); i++){
		if(print){
			cout<<FSMArr[i].fsmName<<"\t"<<FSMArr[i].numStates<<" states\t";
			cout<<FSMArr[i].numEvents<<" events\t";
			cout<<ceil(log2(FSMArr[i].numStates))<<" bits\n";}
		worstcase *= FSMArr[i].numStates;
	}
	if(print){
		cout<<"Worst case (shuffle) is "<<worstcase;
		cout<<" states after parallel composition."<<endl;
	}
	
	return worstcase;
}

/*

unsigned long int DFS_FullComposition(vector<FSM_struct>& FSMArr, vector<bool>& accessed, Event_wrapper& Events, FSM_struct & FSMOut)
{
	//Initialize search stack for depth-first search, add initial state
	//Note that this assumes the 0th state in each file is the marked state
	stack<unsigned long> Stack;
	Stack.push(0); 
	accessed[0] = 1;
	
	//Loop until all states have been visited
	unsigned long int counter = 0;
	unsigned long curState, newState;
	
	while(!Stack.empty()){	
		//Get current state off top of stack
		curState = Stack.top();
		Stack.pop();
		

		//Loop through each FSM, examining the current state's transitions
		for(int i=0; i<FSMArr.size(); i++)
		{
			//Extract state index from encoded composite state
			int stateIndex = (curState>>Events.offset[i])&((1<<Events.bits[i])-1);
			
			//Loop through transitions at current state of FSM
			//Insert events into Event structs
			for(int j=0; j<FSMArr[i].states[stateIndex].numTrans; j++){
				//Insert each event
				Events.insertTrans(FSMArr[i].states[stateIndex].transitions[j].event, i,
					FSMArr[i].states[stateIndex].transitions[j].dest);
			}
		}
		
		CurrentStateName = GenerateStateName(Events, FSMArr, curState);
		
		/* This function should generate the statename by
		   looping through FSMs and concatenating state names */
/*	
		State newstate(CurrentStateName);
		
		//Examine all transitions, insert if unvisited
		vector<unsigned long int> nextStates;
		vector<string> nextEvents;
		Events.getNextAddress(nextStates, nextEvents, curState);

		for(auto it=nextStates.begin(); it!=nextStates.end(); it++)
		{	
			Trans newtrans
			if(accessed[*it] == 0){
				accessed[*it] = 1;
				Stack.push(*it);
			}	
		}

		//Update counter 
		counter++;
		if(!(counter % 10000)){
			cout<<counter<<" states accessed.";
			cout<<" Stack size: "<<Stack.size()<<endl;
		}
		
		Events.clear();
	}
	
	return counter;
}

*/

