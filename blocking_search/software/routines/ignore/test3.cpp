#include <cmath>
#include <iostream>
#include <stdlib.h>
#include <vector>
#include <map>
using namespace std;

       /*                <fsm1, state1.3>
       *                <fsm1, state1.4>
       *                <fsm3, state3.5>
       *                <fsm3, state3.4>
       *                <fsm3, state3.1>
       *                <fsm4, state4.1>
       *                <fsm4, state4.2>
       *                <fsm7, state7.4>
       */
       
int main(void)
{
  vector<pair<int, int> > transitions;
  transitions.push_back(make_pair(1,3));
  
  vector<int> instances;
  
  int fsmIndex = transitions[0].first;
  int tempFsmCount = 1; //=0
  for(int i=1; i<transitions.size(); i++)
  {
	  if( transitions[i].first == fsmIndex )
	  {
	    //Increment FSMcount for this FSM
		  tempFsmCount++;
    }
	  else
	  {
	    //Push last count on instances and access next instance
		  instances.push_back(tempFsmCount);
		  fsmIndex = transitions[i].first;
		  tempFsmCount = 1;
	  }
  }
  instances.push_back(tempFsmCount);
  
  for(int i=0; i<instances.size(); i++)
  {
    cout<<instances[i]<<" ";
  }
  cout<<endl;
}
