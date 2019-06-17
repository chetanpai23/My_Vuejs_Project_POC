<template>
    <b-card
        title=""
        style="max-width: 60rem;float: right;margin:20px"
        class="mb-2">
        <b-container class="bv-example-row" >
            <!-- <button v-show="true" @click="CheckSchema()">Click to Check</button>    -->
            <!-- {{value}}  -->
            <div class="row" v-for="(comp,index) in complist" :key="index">
                <!-- <h1>{{comp['obj']['value']}}</h1> <h1>{{comp['obj']['type']}}</h1> -->
                <component :is="showWhich='timestamp'" :labelname="comp['obj']['type'] | toUpperCase" :min="minValue" :max="maxValue" :value="comp['obj']['value']" :key="index" ></component> 
                
            </div>
    </b-container>
    </b-card>
    
</template>

<script>
import { constants } from 'os';
import TimeStamp from './timestamp.vue';

export default {
    name:'JsonEditor',
    props:['value'],
    components:
    {
        'timestamp':TimeStamp
    },
    filters:
    {
        toUpperCase: function (value) 
        {
            if (!value) return ''
            value = value.toString()
            return value.charAt(0).toUpperCase() + value.slice(1)
        }
    },
    watch: 
    {
        value: function(newVal, oldVal)
        { 
            // console.log('Prop changed: ', newVal, ' | was: ', oldVal)
            this.filterType=[ ];
            this.CheckSchema();
        }
    },
    computed:
    {
        formData:function()
        {
             //var jsonObject=JSON.stringify(this.value.substring(1, this.value.length-1), null, 4);
             var jsonObject=JSON.stringify(this.value);
             jsonObject=JSON.parse(jsonObject);
            console.log('Form data '+jsonObject);
            return jsonObject;
        },
        complist:
        {
            get()
            {
                return this.filterType;
            },
            set(newvalue)
            {
                this.filterType.push(newvalue);
                
            }
        }
        
    },
    data:function()
    {
        return{
            //formData:this.value,
            message:' H e l l o ',
            filterType:[ ],
            showWhich:"TimeStamp",
            showButton:true,
            minValue:2,
            maxValue:6,
            isSchemaChanged:false

       
        }
    },
    methods:{

        childValueChanged($event,topparent,field,parent)
        {
            //console.log('Child Parent Child '+topparent[0] +parent +(this.formData[topparent[0]])[parent]);

            this.$set((this.formData[topparent[0]])[parent],field[0],$event);
            this.$emit('input',this.formData);
        },
        valueChanged($event,parent,field)
        {
            //console.log('Value Changed  ' + field +parent);
            this.$set(this.formData[parent[0]],field,$event);
            this.$emit('input',this.formData);
        },
        checkIfObject(field)
        {
            //console.log('Field Chanaged Value '+field);
            return typeof field[1] ==='object';   
        },
        CheckSchema:function()
        {
            this.showButton=false;
            var localfiltertypeholder=[ ];
            var jsonObject=Object.entries(JSON.parse(this.formData));
            //console.log(jsonObject[0]);

            Object.entries(jsonObject[0][1]).forEach(element => 
            {
                //console.log('Key '+ element[0] +' Value '+element[1]);  
                if(typeof element[1]==='object')
                {
                    //console.log('IS OBJECT');
                    Object.entries(element[1]).forEach(childElement=>
                    {
                        //console.log('Child Element '+childElement[0] +' Value '+childElement[1]);
                        //localfiltertypeholder.push(childElement[0],childElement[1]);
                        localfiltertypeholder.push({type: childElement[0], value: childElement[1]})
                    });  
                }
                else
                {
                    //console.log('Key '+ element[0] +' Value '+element[1]);
                    //localfiltertypeholder.push(element[0],element[1]);
                    localfiltertypeholder.push({type: element[0], value: element[1]})
                }
            });

            console.log(localfiltertypeholder);
            localfiltertypeholder.forEach((element,index) => {
                this.filterType.push({id:index, obj:element});
                //console.log('Elements '+element['type'], element['value']);
            }); 
            
            

        }
        

    },
    created:function()
    {
        var jsonObject=JSON.stringify(this.value);
        jsonObject=JSON.parse(jsonObject);
        this.formData=jsonObject;
        console.log('Json Value Data '+ Object.entries(this.formData[0]));

        // for(let item in Object.values(this.formData[0]))
        // {
        //     console.log('entry '+Object.entries(item));

        // }

        
    }
}
</script>

<style>

</style>
