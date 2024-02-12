import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import axios from "axios";
import {
	BarChart,
	Bar,
	XAxis,
	Tooltip,
	Legend
  } from "recharts";
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Button, styled } from "@mui/material";
import { getRegionData } from "../../actions/region";
import { getBuData } from "../../actions/bu";
import { getSbuHeadData } from "../../actions/sbuHead";
import { getSbuData } from "../../actions/sbu";
import { getLocationData } from "../../actions/locaion";
import { getAccountData } from "../../actions/account";
import { getBdmData } from "../../actions/bdm";
import { getBusinessTypeData } from "../../actions/businessType";
import { getProbabilityData } from "../../actions/probability";


	const ReportSearchModalBox = styled(Box)({
	position: 'absolute',
	top: '57%',
	left: '29%',
	height:"420px",
	transform: 'translate(-50%, -50%)',
	width: 220,
	backgroundColor:"#fff",
	boxShadow: "0px 0px 8px 5px #00000026",
	padding: "10px 10px 10px 10px",
	// overflowY:"auto"
	});

	const SearchModalButton = styled(Button)({
	fontSize:"16px", fontWeight:"400", color:"black", 
	textTransform:"capitalize",
	"&:hover": {
	backgroundColor: "transparent",
	}
	});

	const ReportSearchHeading = styled(`h5`)({
		color:"black",
		fontSize:"16px",
		fontWeight:"500",
		margin:"0px"
	});

	export const ReportSearchButtonSection = styled('div')({
	display: "flex", 
	justifyContent: "space-evenly", 
	padding: "10px 0px"
	});

	export const ModalCancelButton = styled(Button)({
	color: "#000000", 
	background: "#EBEBEB",
	fontSize:"14px",
	fontWeight:"500",
	fontFamily:"Roboto",
	padding:"5px",
	'&:hover': {
		backgroundColor: '#EBEBEB',
	},
	});

	export const ModalControlButton = styled(Button)({
	color: "#FFFFFF", 
	background: "#1E4482",
	fontFamily:"Roboto",
	padding:"5px",
	'&:hover': {
		backgroundColor: '#1E4482',
	},
	});

	export const searchModalTitle = styled('div')({
		display:"flex", 
		alignItems:"center"
		});

    const RadioInput = styled(`input`)({
      boxShadow: "none",
      marginTop:"10px", 
      fontSize:"16px", 
      fontWeight:"400", 
      color:"#000000"
    });

    const OutputTypeHEading = styled(`p`)({
      fontSize:"16px",
      fontWeight:"400", 
      color:"#000000", 
      margin:"10px 0px 0px 0px"
    });

    export const searchModalinnerContainer = styled('div')({
      display:"flex", 
      alignItems:"center"
      });

    

 const ProbabilityWiseReport = (props , onBuChange) => {

	//to open the search model
	const [open, setOpen] = useState(false);

	//to set the chart type
	const [viewType, setViewType] = useState('Monthly');
	const [chartType, setChartType] = useState('Tabular');

	const [buId, setBuId] = useState('');
	const [sbuId, setSbuId] = useState('');
	const [sbuHeadId, setSbuHeadId] = useState('');
	const [businessTypeID, setBusinessTypeID] = useState('');
	const [probabilityId, setProbabilityId] = useState('');
	const [locationId, setLocationId] = useState('');
	const [bdmId, setBdmId] = useState('');
	const [accountId, setAccountId] = useState('');
	const [regionId, setRegionId] = useState('');


	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const handleViewTypeChange = (event) => {
		setViewType(event.target.value);
	  };
	  const handleChartTypeChange = (event) => {
		setChartType(event.target.value);
	  };

	  const regionHandler = (e) => {
		setRegionId(e.target.value);
	  }

    const handleBuChange = (e) => {
      const selectedBuId = e.target.value;
      setBuId(selectedBuId);
      onBuChange(selectedBuId);
      }
	  const sbuHeadHandler = (e) => {
		setSbuHeadId(e.target.value);
	  }

	  const businessTypeHandler = (e) => {
		setBusinessTypeID(e.target.value)
	  }
	  const probabilityHandler = (e) => {
		setProbabilityId(e.target.value)
	  }


	  const sbuIdHandler = (e) => {
		setSbuId(e.target.value);
	  }

	  const locationHandler = (e) => {
		setLocationId(e.target.value)
	  }
	  const accountHandler = (e) => {
		setAccountId(e.target.value)
	  }
	  const bdmIdHandler = (e) => {
		setBdmId(e.target.value)
	  }

	  useEffect(() => {
		// Dispatch the action to get region data when the component mounts
		props.getRegionData();
		props.getBuData();
		props.getSbuHeadData();
		props.getSbuData();
		props.getLocationData();
		props.getAccountData();
		props.getBdmData();
		props.getBusinessTypeData();
		props.getProbabilityData();
	  }, []);

	  // chart related

	  const [responseData, setResponseData] = useState(null);
	  const [reportProbabilityData, setReportProbabilityData] = useState([]);
	  const [filteredLabel, setFilteredLabel] = useState([]);

	  const label = reportProbabilityData?.labels;
	  const outDTOList = reportProbabilityData?.outDTOList;
	  const confirmedData = outDTOList?.find(item => item.label === 'Confirmed')?.data;
	  const exceptedData = outDTOList?.find(item => item.label === 'Excepted')?.data;
	  const upsideData = outDTOList?.find(item => item.label === 'Upside')?.data;
	  const highUpsideData = outDTOList?.find(item => item.label === 'High-Upside')?.data;


	  const dataList = label?.map((labels, index) => ({
		name: labels,
		Conifmed: confirmedData ? confirmedData[index] : 0,
		Expected: confirmedData ? exceptedData[index] : 0,
		Upside: confirmedData ? upsideData[index] : 0,	
		HighUpside: confirmedData ? highUpsideData[index] : 0,
	  }));

	  const reportData = {
		"viewType": viewType,
		"data": {
		  "financialYearName": "2023-2024",
      "regionId": regionId,
		  "businessUnitId": buId,
		  "sbuId": sbuId,
		  "sbuHeadId": sbuHeadId,
		  "businessTypeId": businessTypeID,
		  "probabilityTypeId": probabilityId,
		  "locationId": locationId,
		  "accountId": accountId,
		  "bdmId": bdmId
		}
	  }
	
	  const getReportRegionData = async () =>{
		var {data } = await axios.post(
		  "http://192.168.16.55:8080/rollingrevenuereport/api/v1/report/probabilitytype",
		  reportData
		);
		setReportProbabilityData(data.data);
		setFilteredLabel(data.data.labels);
	  }

	  const handleApplyButtonClick = () => {
		getReportRegionData();
		setOpen(false);
	  };

	  const handleReset = () =>{
		setBuId("");
		setSbuId("");
		setSbuHeadId("");
		setBusinessTypeID("");
		setProbabilityId("");
		setLocationId("");
		setAccountId("");
		setBdmId("");
    setRegionId("");
		setOpen(false);
		setReportProbabilityData([])
	  }

  return (
	<div>
	<div className='report-container'>
		<searchModalTitle style={{display:"flex", alignItems:"center"}}>
			<FilterAltOutlinedIcon />
			<SearchModalButton onClick={handleOpen}>Apply filter here for other views</SearchModalButton>
		</searchModalTitle>
		<div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ReportSearchModalBox>
        <div>       
          <ReportSearchHeading>Report Filters: </ReportSearchHeading>
        </div>
		<div>
          <RadioInput type="radio" value="Quarterly" name="viewType"
            onChange={handleViewTypeChange}
			checked={viewType === 'Quarterly'}
			// style={{ boxShadow: "none", marginTop:"10px", fontSize:"16px", fontWeight:"400", color:"#000000" }} 
      /> 
      Quarterly
          <br />
		  <RadioInput type="radio" value="Monthly" name="viewType" 
            onChange={handleViewTypeChange} 
			checked={viewType === 'Monthly'}
      /> Monthly
        </div>
		<div>
          <OutputTypeHEading>Output Type: </OutputTypeHEading>
        </div>
		<div>
          <RadioInput type="radio" value="Chart" name="chartType" defaultChecked
            onChange={handleChartTypeChange} 
            /> Chart
          <RadioInput type="radio" value="Tabular" name="chartType"  disabled
            onChange={handleChartTypeChange} 
            /> Tabular
        </div>
		<div className='searchFilterInnerContainer' style={{paddingRight:"15px",height:"234px",overflowY:"auto",paddingTop:"10px"}}>

    <div style={{ padding: "3px 0px" }}>
                <label
                  for="email"
                  style={{ fontWeight: "400", fontSize: "16px" }}
                >
                  <span>Region :</span>
                </label>
                <select
                  style={{
                    height: "28px",
                    width: "100%",
                    borderRadius: "3px",
                    boxShadow: "none",
                    fontFamily:"Roboto",
                    fontSize:"16px",
                    fontWeight:"400",
					border:"1px solid #00000061"
                  }}
				  onChange={regionHandler} 
                >
                  <option value="" disabled selected hidden>
                  </option>
                  {props.regionData.regionData &&
              props.regionData.regionData.map((obj, id) => (
                <option value={obj.regionId}>{obj.regionName}</option>
              ))}
                </select>
              </div>

			  <div style={{ padding: "3px 0px" }}>
                <label
                  for="email"
                  style={{ fontWeight: "400", fontSize: "16px" }}
                >
                  <span>BU :</span>
                </label>
                <select
                  style={{
                    height: "28px",
                    width: "100%",
                    borderRadius: "3px",
                    boxShadow: "none",
                    fontFamily:"Roboto",
                    fontSize:"16px",
                    fontWeight:"400",
					border:"1px solid #00000061"
                  }}
				  onChange={handleBuChange} 
                >
                  <option value="" disabled selected hidden>
                  </option>
				  {props?.buData?.buData &&
              props.buData.buData.map((obj, id) => (
                <option value={obj.businessUnitId}>{obj.businessUnitName}</option>
              ))}
                </select>
              </div>

			  <div style={{ padding: "3px 0px" }}>
                <label
                  for="email"
                  style={{ fontWeight: "400", fontSize: "16px" }}
                >
                  <span>SBU:</span>
                </label>
                <select
                  style={{
                    height: "28px",
                    width: "100%",
                    borderRadius: "3px",
                    boxShadow: "none",
                    fontFamily:"Roboto",
                    fontSize:"16px",
                    fontWeight:"400",
					border:"1px solid #00000061"
                  }}
				  onChange={sbuIdHandler}
                >
                  <option value="" disabled selected hidden>
                  </option>
				  {props.sbuData.sbuData &&
              props.sbuData.sbuData.map((obj, id) => (
                <option value={obj.sbuId}>{obj.sbuName}</option>
              ))}
                </select>
              </div>

			  <div style={{ padding: "3px 0px" }}>
                <label
                  for="email"
                  style={{ fontWeight: "400", fontSize: "16px" }}
                >
                  <span>SBU Head  :</span>
                </label>
                <select
                  style={{
                    height: "28px",
                    width: "100%",
                    borderRadius: "3px",
                    boxShadow: "none",
                    fontFamily:"Roboto",
                    fontSize:"16px",
                    fontWeight:"400",
					border:"1px solid #00000061"
                  }}
				  onChange={sbuHeadHandler}
                >
                  <option value="" disabled selected hidden>
                  </option>
				  {props.sbuHeadData.sbuHeadData &&
              props.sbuHeadData.sbuHeadData.map((obj, id) => (
                <option value={obj.sbuHeadId}>{obj.sbuHeadName}</option>
              ))}
                </select>
              </div>



			  <div style={{ padding: "3px 0px" }}>
                <label
                  for="email"
                  style={{ fontWeight: "400", fontSize: "16px" }}
                >
                  <span>Business Type :</span>
                </label>
                <select
                  style={{
                    height: "28px",
                    width: "100%",
                    borderRadius: "3px",
                    boxShadow: "none",
                    fontFamily:"Roboto",
                    fontSize:"16px",
                    fontWeight:"400",
					border:"1px solid #00000061"
                  }}
				  onChange={businessTypeHandler}
                >
                  <option value="" disabled selected hidden>
                  </option>
				  {props.businessTypeData.businessTypeData &&
              props.businessTypeData.businessTypeData.map((obj, id) => (
                <option value={obj.businessTypeId}>{obj.businessTypeDisplayName}</option>
              ))}
                </select>
              </div>

			  <div style={{ padding: "3px 0px" }}>
                <label
                  for="email"
                  style={{ fontWeight: "400", fontSize: "16px" }}
                >
                  <span>Probability Type:</span>
                </label>
                <select
                  style={{
                    height: "28px",
                    width: "100%",
                    borderRadius: "3px",
                    boxShadow: "none",
                    fontFamily:"Roboto",
                    fontSize:"16px",
                    fontWeight:"400",
					border:"1px solid #00000061"
                  }}
				  onChange={probabilityHandler}
                >
                  <option value="" disabled selected hidden>
                  </option>
				  {props.probabilityData.probabilityData &&
              props.probabilityData.probabilityData.map((obj, id) => (
                <option value={obj.probabilityTypeId}>{obj.probabilityTypeName}</option>
              ))}
                </select>
              </div>

			  <div style={{ padding: "3px 0px" }}>
                <label
                  for="email"
                  style={{ fontWeight: "400", fontSize: "16px" }}
                >
                  <span>Location:</span>
                </label>
                <select
                  style={{
                    height: "28px",
                    width: "100%",
                    borderRadius: "3px",
                    boxShadow: "none",
                    fontFamily:"Roboto",
                    fontSize:"16px",
                    fontWeight:"400",
					border:"1px solid #00000061"
                  }}
				  onChange={locationHandler}
                >
                  <option value="" disabled selected hidden>
                  </option>
				  {props.locationData.locationData &&
              props.locationData.locationData.map((obj, id) => (
                <option value={obj.locationId}>{obj.locationName}</option>
              ))}
                </select>
              </div>

			  <div style={{ padding: "3px 0px" }}>

			  <label
                  for="email"
                  style={{ fontWeight: "400", fontSize: "16px" }}
                >
                  <span>Account:</span>
				  <select
            id="revenue-select"
            name="accountId"
            onChange={accountHandler}
			style={{
				height: "28px",
				width: "100%",
				borderRadius: "3px",
				boxShadow: "none",
				fontFamily:"Roboto",
				fontSize:"16px",
				fontWeight:"400",
				border:"1px solid #00000061"
			  }}
			>
				
            <option value="" disabled selected hidden>
            </option>
            {props.accountData.accountData &&
              props.accountData.accountData.map((obj, id) => (
                <option value={obj.accountId}>{obj.accountName}</option>
              ))}
          </select>
                </label>

			 </div>


			  <div style={{ padding: "3px 0px" }}>
                <label
                  for="email"
                  style={{ fontWeight: "400", fontSize: "16px" }}
                >
                  <span>BDM:</span>
                </label>
                <select
                  style={{
                    height: "28px",
                    width: "100%",
                    borderRadius: "3px",
                    boxShadow: "none",
                    fontFamily:"Roboto",
                    fontSize:"16px",
                    fontWeight:"400",
					border:"1px solid #00000061"
                  }}
				  onChange={bdmIdHandler}
                >
                  <option value="" disabled selected hidden>
                  </option>
				  {props.bdmData.bdmData &&
              props.bdmData.bdmData.map((obj, id) => (
                <option value={obj.bdmId}>{obj.bdmName}</option>
              ))}
                </select>
              </div>

			  </div>

			  <ReportSearchButtonSection>
			  <ModalCancelButton
                  type="button"
                  variant="contained"

                  value="Cancel"
                  id="create-account"
				  onClick={handleReset}
                >
                  reset view
                </ModalCancelButton>
                <ModalControlButton
                  type="button"
                  value="Save"
                  id="create-account"
                  variant="contained"
				  onClick={handleApplyButtonClick}
                >
                  apply
                </ModalControlButton>

              </ReportSearchButtonSection>
        </ReportSearchModalBox>
      </Modal>
    </div>
	</div>

	<div style={{marginLeft:"250px"}}>
	{buId !== '' && buId !== '0' && (
      <div>
    <BarChart
      width={1000}
      height={400}
      style={{marginTop:"30px"}}
      data={dataList}
      margin={{
        top: 30,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <XAxis style={{fontSize:"9px"}}  dataKey="name" interval={0}/>
      <Tooltip />
      <Legend />
      <Bar dataKey="Conifmed" stackId="a" fill="#93B1A6" />
      <Bar dataKey="Expected" stackId="a" fill="#5C8374" />
      <Bar dataKey="Upside" stackId="a" fill="#183D3D" />
      <Bar dataKey="HighUpside" stackId="a" fill="#040D12" />
    </BarChart>
    </div>
	)}
    </div>
	</div>
  )
}

const mapStateToProps = (state) => {
	return {
	  regionData: state.regionData,
	  buData: state.buData,
	  sbuHeadData: state.sbuHeadData,
	  sbuData: state.sbuData,
	  locationData: state.locationData,
	  accountData: state.accountData,
	  bdmData: state.bdmData,
	  businessTypeData: state.businessTypeData,
	  probabilityData: state.probabilityData,

	};
  };

  const mapDispatchToProps = (dispatch) => {
	return {
	  getRegionData: () => dispatch(getRegionData()),
	  getBuData: () => dispatch(getBuData()),
	  getSbuHeadData: () => dispatch(getSbuHeadData()),
	  getSbuData: () => dispatch(getSbuData()),
	  getLocationData: () => dispatch(getLocationData()),
	  getAccountData: () => dispatch(getAccountData()),
	  getBdmData: () => dispatch(getBdmData()),
	  getBusinessTypeData: () => dispatch(getBusinessTypeData()),
	  getProbabilityData: () => dispatch(getProbabilityData()),
	//   getReportData: (data) => dispatch(getReportData(data)),
	};
  };
export default connect(mapStateToProps, mapDispatchToProps)(ProbabilityWiseReport);
