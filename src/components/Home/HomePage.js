import React from "react";
import { Box, Typography, styled } from "@mui/material";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Label,
  LabelList,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import dashboardIcon from "../../assets/dashboardIcon.png"

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  // padding: theme.spacing(1),
  padding:"5px 10px"
}));

const data = [
  { name: "Q1", NA: 600, EU: 400, APAC: 300 },
  { name: "Q2", NA: 800, EU: 600, APAC: 500 },
  { name: "Q3", NA: 900, EU: 700, APAC: 600 },
  { name: "Q4", NA: 1000, EU: 800, APAC: 700 },
];

const dataPie = [
  { name: "ECNB", value: 50 },
  { name: "ECEB", value: 30 },
  { name: "NCNB", value: 20 },
];
const COLORS = ["#0E2954", "#1F6E8C", "#2E8A99"];

const calculateChartWidth = () => {
  const numItems = data ? data.length : 0;
  const labelWidth = 60;
  const minWidth = 500;
  const calculatedWidth = Math.max(minWidth, numItems * labelWidth);
  return calculatedWidth;
};

const HomePage = () => {
  return (
    <div className="dashboard_container">
      <div style={{ margin: "0px 60px 0px 20px" }}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography style={{ fontSize: "23px", fontWeight: "500" }}>
            Dashboard
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Grid container direction="column" spacing={1.5}>
                <Grid item xs>
                  <Item>
                    <div style={{display:"flex", justifyContent:"space-between"}}>
                    <Typography
                      style={{
                        color: "#000000",
                        fontSize: "18px",
                        fontWeight: "500",
                      }}
                    >
                      Revenue of FY 2023-24
                    </Typography>
                    <img src={dashboardIcon} style={{backgroundColor:"#1E4482", padding:"3px", borderRadius:"9px", marginRight:"10px"}} />
                    </div>
                    <Typography
                      style={{
                        color: "#1E4482",
                        fontSize: "18px",
                        fontWeight: "500",
                      }}
                    >
                      $ 23,56,789
                    </Typography>
                  </Item>
                </Grid>
                <Grid item xs>
                  <Item>
                  <div style={{display:"flex", justifyContent:"space-between"}}>

                    <Typography
                      style={{
                        color: "#000000",
                        fontSize: "18px",
                        fontWeight: "500",
                      }}
                    >
                      Confirmed & Expected
                    </Typography>
                    <img src={dashboardIcon} style={{backgroundColor:"#1E4482", padding:"3px", borderRadius:"9px", marginRight:"10px"}} />
</div>
                    <Typography
                      style={{
                        color: "#1E4482",
                        fontSize: "18px",
                        fontWeight: "500",
                      }}
                    >
                      $ 23,56,789
                    </Typography>
                    <Typography
                      style={{
                        color: "#000000",
                        fontSize: "18px",
                        fontWeight: "500",
                      }}
                    >
                      Upside & High Upside
                    </Typography>
                    <Typography
                      style={{
                        color: "#1E4482",
                        fontSize: "18px",
                        fontWeight: "500",
                      }}
                    >
                      $ 23,56,789
                    </Typography>
                  </Item>
                </Grid>
                <Grid item xs>
                  <Item>
                    <div className="dashboard_holiday_section ">
                      <div>
                        <Typography
                          style={{
                            color: "#000000",
                            fontSize: "18px",
                            fontWeight: "500",
                          }}
                        >
                          Upcoming Holidays
                        </Typography>
                        <Typography
                          style={{
                            color: "#000000",
                            fontSize: "15px",
                            fontWeight: "400",
                          }}
                        >
                          15 Aug Tuesday
                          - Independence Day(On site)
                        </Typography>
                        <Typography
                          style={{
                            color: "#000000",
                            fontSize: "15px",
                            fontWeight: "400",
                          }}
                        >
                          12 Mar Monday
                          - Holi Day(On site)
                        </Typography>
                      </div>

                      <div>
                        <Typography
                          style={{
                            color: "#000000",
                            fontSize: "18px",
                            fontWeight: "500",
                            paddingTop:"5px"
                          }}
                        >
                          Upcoming Meetings
                        </Typography>
                        <Typography
                          style={{
                            color: "#000000",
                            fontSize: "15px",
                            fontWeight: "400",
                          }}
                        >
                          08 Mar Wednesday -
                          Meeting RR
                        </Typography>

                        <Typography
                          style={{
                            color: "#000000",
                            fontSize: "15px",
                            fontWeight: "400",
                          }}
                        >
                          10 Mar Friday -
                          Rolling Revenue Weekly Update Meeting
                        </Typography>
                      </div>
                    </div>
                  </Item>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={8}>
              <Grid container direction="column" spacing={2}>
                <Grid item xs>
                  <Item>
                    <Typography
                      style={{
                        color: "#000000",
                        fontSize: "22px",
                        fontWeight: "400",
                      }}
                    >
                      Region wise Revenue of FY 2023-24
                    </Typography>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <BarChart
                        width={calculateChartWidth()}
                        height={160}
                        data={data}
                        margin={{
                          top: 30,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                        barCategoryGap={30}
                      >
                        <XAxis
                          style={{ fontSize: "10px" }}
                          dataKey="name"
                          interval={0}
                        />

                        <YAxis style={{ fontSize: "10px" }} interval={0}>
                          <Label
                            value="Revenue"
                            position="insideLeft"
                            angle={-90}
                            style={{ textAnchor: "middle" }}
                          />
                        </YAxis>
                        <Tooltip
                          formatter={(value, name, props) => [
                            "$" + value,
                            name,
                          ]}
                        />
                        <Legend />
                        <Bar dataKey="NA" stackId="a" fill="#0E2954" />
                        <Bar dataKey="EU" stackId="a" fill="#1F6E8C" />
                        <Bar
                          dataKey="APAC"
                          stackId="a"
                          fill="#2E8A99"
                          label={{
                            position: "top",
                            formatter: (value) => {
                              const formattedValue =
                                value !== 0
                                  ? `$${(value / 1000).toFixed(0)}k`
                                  : null;
                              return formattedValue;
                            },
                          }}
                        />
                      </BarChart>
                    </div>
                  </Item>
                </Grid>
                <Grid item xs>
                  <Item>
                    <Typography
                      style={{
                        color: "#000000",
                        fontSize: "22px",
                        fontWeight: "400",
                        marginTop:"10px"
                      }}
                    >
                      Revenue Forecast for FY’ 23-24
                    </Typography>
                    <div style={{ display: "flex", justifyContent: "center", marginTop:"8px" }}>
                      <div style={{ marginRight: "20px" }}>
                        <ResponsiveContainer width={300} height={150}>
                          <PieChart>
                            <Pie
                              data={dataPie}
                              dataKey="value"
                              nameKey="name"
                              cx="50%"
                              cy="50%"
                              outerRadius={60}
                              fill="#8884d8"
                            >
                              {data.map((entry, index) => (
                                <Cell
                                  key={`cell-${index}`}
                                  fill={COLORS[index % COLORS.length]}
                                />
                              ))}
                            </Pie>
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                      <div>
                        {dataPie.map((entry, index) => (
                          <div key={index} style={{ marginBottom: "10px" }}>
                            <span
                              style={{
                                color: COLORS[index],
                                marginRight: "5px",
                                display: "inline-block",
                                width: "15px",
                                height: "15px",
                                border: "1px solid COLORS[index]",
                                backgroundColor: COLORS[index],
                              }}
                            >
                              ■
                            </span>

                            <span>
                              {entry.name} {entry.value} {"%"}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Item>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </div>
    </div>
  );
};

export default HomePage;
