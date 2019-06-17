<template>
  <div id="app">
      <div class="column1" style="background-color:Black;">
        <i class="fa fa-caret-right" style="color:white;float:right;margin-right:5px;margin-top:5px;cursor: pointer;display:none"></i>
        <i class="fa fa-caret-left" style="color:white;float:right;margin-right:5px;margin-top:5px;cursor: pointer;"></i>
          <div class="block" style="margin-top:40px;margin-left:5px;height:50%;width:90%" >
             <label style="color:white;font-size:20px;"> Vehicle :  </label>
             <select class="custom-select mb-2" style="width:90%;" v-model="vehicleSelected">
              <optgroup label=" Active Vehicle ">
                <option v-for="vehicle in activeVehicle" :key="vehicle">{{vehicle}}</option>
                <!-- <option value="Echo TGW">Echo TGW</option> -->
              </optgroup>
              <optgroup label="Named Vehicle">
                <option v-for="namedVehicle in activeNamedVehicle" :key="namedVehicle">{{namedVehicle}}</option>
                <!-- <option value="">500001218 -50000123</option>
                <option value="">500001818 -50000125</option>
                <option value="">500002018 -50000122</option> -->
              </optgroup>
            </select>
            <div class="input-group mb-3" style="margin-top:40px">
              <input type="text" class="form-control" style="background-color:black;color:white" placeholder="Search" >
              <div class="input-group-append">
                <button class="btn btn-outline-secondary" type="button" style="color:white"><i class="fa fa-search"></i></button>
              </div>
            </div>
          </div>
          
            
      </div>
      <div class="column2" style="background-color:white;">
        <!-- <div class="row" style="margin-left:10px;margin-top:0px;">
            <i class="fa fa-plus-circle" @click="showConfigMessageClicked()" style="font-size:32px;color:green;margin-right:5px;cursor: pointer;"></i>
            <h4> Configure Message  </h4>
        </div> -->
        
        <transition-group name="fade" style="overflow-y:auto;" >
          <div v-for="(counter,index) in formCounter" :key="index" style="padding:1px;"  >
            <div>
            <div style="float:left;margin-left:5px;margin-top:1px">  
                <!-- <b>Service  :</b>      -->
                <select :key="index" v-model="selectedService" @change="serviceSelectionChanged()" class="custom-select mb-3" style="width:35%;margin-right:10px;border:1px solid black;">
                      <option value="null">Select the Service</option>
                      <option value="1">Communication Service V1 </option>
                      <option value="8">Event Log Service V1</option>
                      <option value="11">Geofence V1</option>
                      <option value="14">Driver Time Justification V1</option>
                </select>
                <!-- <b> PDU : </b>      -->
                <select :disabled="selectedService==null" :key="index" v-model="pudSelected" @change="selectionChanged()" class="custom-select mb-3" style="width:45%;border:1px solid black;position:relative">
                      <option value="null">Select the PDU</option>
                      <option :value="pdu" v-for="pdu in pduList " :key="pdu">{{pdu}}</option>
                      <!-- <option value="comsetup-10">comsetup-10</option> -->
                </select>
                <div class="float-right" style="margin-left:1px;position:relative;">
                  <i class="fa fa-plus-circle" @click="showConfigMessageClicked()" style="font-size:25px;color:green;margin-left:5px;cursor: pointer;"></i>
                  <i class="fa fa-arrow-circle-down" style="font-size:25px;color:green;margin-left:5px;cursor: pointer;"></i>
                  <i class="fa fa-minus-circle" style="font-size:25px;color:red;margin-left:5px;cursor: pointer;"></i>
                </div>
                <hr>
            </div>
            
            <div v-show="showConfigureMessage" style="position:relative;top:10px;width:100%;height:100%;overflow-y:auto;"> 
              <div>
                  <b-card no-body class="mb-1" :key="index">
                    <b-card-header header-tag="header" class="p-1" role="tab" @click.prevent="active = !active">
                      <b-button block href="#" v-b-toggle.accordion-1 variant="info" style="float:right"> <span> <b> Service ID :{{selectedService}}  --  PDU: {{pudSelected | trimSelectedPdu}} </b> </span>   
                        <span class="down-Arrow" v-show="!active" style="float:right">&#9660;</span>
                        <span class="up-Arrow" v-show="active" style="float:right">&#9650;</span>
                      </b-button>
                      
                    </b-card-header>
                    <b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel">
                      <b-card-body>
                          <div class="row" style="margin-left:50px">
                                <JsonEditor v-model="JsonString" />
                          </div> 
                          <div class="row" style="float: right; margin-right: 125px;position:relative">
                            <b-button style="margin-right:4px;">Send Message</b-button>
                            <b-button>Clear Message</b-button>
                          </div>
                          
                      </b-card-body>
                    </b-collapse>
                  </b-card>
              </div>
            </div>
          </div>
          </div>
          
        </transition-group>
        
      </div>
      
      <div class="column3" style="background-color:white;">
        <!-- <h5> Show History</h5> -->
        <i class="fa fa-expand-alt"></i>
        <p></p>
      </div>

      
      
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import JsonEditor  from './components/JsonEditor.vue';
import axios from 'axios';
import Bot from './components/Bot.vue';
import CustomSelect from './components/CustomSelect.vue';

export default {
  name: 'app',
  components: {
    JsonEditor,
    Bot,
    CustomSelect
  },
  computed:
  {
    computedFormCounter()
    {
      return this.formCounter;
    },
    JsonString:function()
    {
      console.log('Schema Chanaged from App.vue');
      return JSON.stringify(this.schema, null,2 ).trim(); 
    },
    JsonAPi:function()
    {     
      return JSON.stringify(this.axiosData, null); 
    }
  },
  filters: {
    pretty: function(value) 
    {
      return JSON.stringify(JSON.parse(value), null, 2);
    },
    capitalize: function (value) 
    {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    },
    toUpperCase: function (value) 
    {
        if (!value) return ''
        value = value.toString()
        return value.charAt(0).toUpperCase() + value.slice(1)
    },
    trimSelectedPdu: function (value) 
    {
        if (!value) return ''
        value = value.split(':')[1].toString();
        console.log(value);
        return value.charAt(0).toUpperCase() + value.slice(1)
    }
  },
  data:function()
  {
    return{
      schema:null,
      vehicleSelected:'',
      formdata:'',
      axiosData:'loading . . ',
      selected:2,
      showConfigureMessage:false,
      componentKey:0,
      active:false,
      pduList:null,
      pudSelected:null,
      activeNamedVehicle:null,
      activeVehicle:null,
      formCounter:1,
      displaySidebar:true,
      selectedService:null,
      dummySchema:{
            "eventLogReport": 
            {
              "patternId": 3121,
              "patternId2": 3121,
              "patternId2": 3121,
              "triggerId": 1,
              "triggerTime": new Date('2019-05-21T10:20:30Z'),
              "specificData": {"Date":"NewDate", "longitude":10},
              "dataContentReport": 
              {
                "duration": 121,
                "dataContentId": 1,
                "data": ['SomeData'],
                  "dataContentReport": 
                {
                  "duration": 121,
                  "dataContentId": 1,
                  "data": ['SomeData']
                }
              },
              "dataContentReport": 
              {
                "duration": 121,
                "dataContentId": 1,
                "data": ['SomeData']
              }
            }
        }
    }
  },
  mounted()
  {
    if(localStorage.vehicleSelected)
    {
      this.vehicleSelected=localStorage.vehicleSelected;
    }
    axios.get('http://web-predev-botserver.got.volvo.net:8001/api/vehicles').then((response)=>
    {
      console.log('Vehicles '+ response.data);

      this.activeVehicle=response.data['active_vehicles']
      this.activeNamedVehicle=response.data['named_vehicles']
    });
  },
  watch:
  {
    vehicleSelected(newValue)
    {
      localStorage.vehicleSelected=newValue;
    }
  },
  created:function()
  { 
      axios.get('http://web-predev-botserver.got.volvo.net:8001/api/asn_default_message/1/1/ErrorMsg-11').then((response)=>
        {
          console.log('Data '+ Object.entries(response.data)[0]);


          this.axiosData=response.data;
          this.schema=response.data;
        });
      axios.get('http://web-predev-botserver.got.volvo.net/api/asn_choices/1/1').then((response)=>
      {
        console.log('PDU List '+ response.data['choices']);

        this.pduList=response.data['choices']
        this.pduList=this.pduList.split(':')[1].toString();
      });
      axios.get('http://web-predev-botserver.got.volvo.net:8001/api/vehicles').then((response)=>
      {
        console.log('Vehicles '+ response.data);

        this.activeVehicle=response.data['active_vehicles']
        this.activeNamedVehicle=response.data['named_vehicles']
      });


  },
  methods:
  {
    hideUnhideSidebar(hide)
    {

    },
    showConfigMessageClicked()
    {
      this.showConfigureMessage=true;

      //this.formCounter+=1;



      // this.axiosData=this.dummySchema;
      // this.schema=this.dummySchema;
      // console.log('dummy schema '+this.dummySchema[0]);
    },
    forceRerender()
    {
      this.componentKey+=1;
    },
    serviceSelectionChanged()
    {
      axios.get(`http://web-predev-botserver.got.volvo.net/api/asn_choices/${this.selectedService}/1`).then((response)=>
      {
        console.log('PDU List '+ response.data['choices']);

        this.pduList=response.data['choices'];
      });
    },
    selectionChanged()
    {
      let pudSelectedValue=this.pudSelected;
      pudSelectedValue=this.pudSelected.split(':')[1].toString();
      pudSelectedValue=pudSelectedValue.charAt(0).toUpperCase() + pudSelectedValue.slice(1);
      console.log('Selected PDU '+pudSelectedValue);

      //https://api.coindesk.com/v1/bpi/currentprice.json   -- http://web-predev-botserver.got.volvo.net:8001/api/asn_default_message/1/2/ErrorMsg-12
      console.log('Entering ');

      let url=`http://web-predev-botserver.got.volvo.net:8001/api/asn_default_message/${this.selectedService}/1/${pudSelectedValue}`;

      console.log(url);
      axios.get(url).then((response)=>
      {
        console.log('Data '+ Object.entries(response.data)[0]);

        this.axiosData=response.data;
        this.schema=response.data;
      });
      
    }
  }
}
</script>

<style>

#app {
  height: 100%;
  font-family: 'Open Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #FDFEFE;
  display: '-webkit-box', '-ms-flexbox', 'flex';  
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}


li{
  margin: 20px 0;
  cursor:pointer;
}
.column1 {
  float: left;
  width: 18%;
  height: 100%; /* Should be removed. Only for demonstration */
  /* box-shadow: 1px 2px 2px 6px #ccc; */
}
.column2 {
  float: left;
  width: 57%;
  height: 100%; /* Should be removed. Only for demonstration */
  position: relative;
  /* box-shadow: 1px 2px 2px 6px #ccc; */
  overflow: auto;
  border:1px solid gray;
}
.column3 {
  float: left;
  width: 25%;
  height: 100%; /* Should be removed. Only for demonstration */
  /* box-shadow: 1px 2px 2px 6px #ccc; */
}
.column {
  float: left;
  width: 33.33%;
  height: 100%; /* Should be removed. Only for demonstration */
}

</style>
