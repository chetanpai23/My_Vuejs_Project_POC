<template>
    <div class="container">
        <div class="row" >
            <!-- <b-card bg-variant="light"> -->
                <!-- <b-form-group label-size="sm" :label="labelname">
                    <b-form-input :value="value" @input="valueChanged($event)" :state="nameState" size="sm" aria-describedby="input-live-help input-live-feedback"/> 
                    <b-form-invalid-feedback id="input-live-feedback">
                        Input range in {{min}} - {{max}} 
                    </b-form-invalid-feedback>           
                </b-form-group> -->
            <!-- </b-card> -->
            <b-col cols="4">  
                        <b-form-input :placeholder="labelname | capitalize" readonly></b-form-input>
            </b-col>
            <!-- <b-col cols="3"> 
                <b-form-input :placeholder="'Range ('+min +' - '+ max+')'" readonly></b-form-input>
            </b-col> -->
            <!-- <b-col cols="2"> 
                <b-form-input :value="value"></b-form-input>
            </b-col> -->
            <b-form-group label-size="sm">
                <b-form-input :value="value" @input="valueChanged($event)" :state="nameState" size="sm" aria-describedby="input-live-help input-live-feedback"/> 
                <b-form-invalid-feedback id="input-live-feedback">
                    Input range in {{min}} - {{max}} 
                </b-form-invalid-feedback>           
            </b-form-group>
            <b-col cols="1"> 
                <button style="width:50px">+</button>
            </b-col>
            
            
        </div>
    </div>
    
</template>

<script>
export default {
// label-cols="6" label-cols-lg="4" label-size="lg" 
    props:['labelname','inputtype','inputvalue','min','max','value','schema'],
    name:"timestamp",
    data()
    {
        return{
            msg:"",
            formData:this.value || {}
        }
    },
    computed:{
        nameState:function() 
        {
            console.log(this.min, this.max);
            return (this.value >this.min && this.value <= this.max)  ?   true:   false;
        }
    },
    methods:{
       valueChanged($event)
       {
           this.value=$event;
           this.$set(this.formData,$event);
           this.$emit('input',$event);
       }
    },
    filters:
    {
        minMaxRange(value)
        {
            console.log('Min'+value);
            return 'Range '+ value +'-' + this.max;
        }
    }


}
</script>

<style>

</style>
