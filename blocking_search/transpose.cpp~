#include <iostream>
#include <iomanip>
#include <fstream>
#include <stack>

using namespace std;

int main(void)
{
  ifstream infile;
  infile.open("da_v4,kivl_v3,lp_v3,retry_v3,temp1trevC,temp2tmin,temp5min,ula_v4,faultFSM_no_dl2,lkp_v3,subsys3min-blockingEvents.txt");
  
  ofstream outfile;
  outfile.open("blockingEvents-short.txt");
  
  int numEvents;
  string junk;
  infile >> hex >> numEvents;
  infile >> junk;
  infile >> junk;
  infile >> junk;


  outfile << numEvents << " events." << endl << endl; 
  while(!infile.eof() && infile.good())
  {
    stack<string> s;
    string state;
    infile >>  state;
    string end = state;

    while( state.compare("00000000") )
    {
      string event;
      infile >> event;
      //cout << event << endl;
      s.push(event.substr(2,event.size()-4));
      infile >> state;
    }
    outfile << "00000000" << " -> ";
    while(!s.empty())
    {     
      outfile << s.top() << ", ";
      s.pop();
    }
    outfile << "-> " << end << endl; 
  }
  
  cout << endl;
  infile.close();
  outfile.close();
  
}

