<template>
  <div role="tablist">
    <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button block href="#" v-b-toggle.accordion-1 variant="info"> <b> Service Name </b> : Communication Service </b-button>
      </b-card-header>
      <b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel">
        <b-card-body>
            <div class="row" style="padding:12px">
                  <JsonEditor v-model="schema"/>
                  <hr>
                  <b-card>
                    <pre class="json"> {{JsonString | pretty}} </pre> 
                  </b-card> 
            </div> 
            <input type="submit" value="Send Message">
            <input type="submit" value="Reset">
        </b-card-body>
      </b-collapse>
    </b-card>

    <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button block href="#" v-b-toggle.accordion-2 variant="info"> <b> Service Name </b> :  Event Logger </b-button>
      </b-card-header>
      <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
        <b-card-body>
          <div class="row" style="padding:12px">
                  <JsonEditor v-model="schema"/>
                  <hr>
                  <b-card>
                    <pre class="json"> {{JsonString | pretty}} </pre> 
                  </b-card> 
            </div> 
            <input type="submit" value="Send Message">
            <input type="submit" value="Reset">
        </b-card-body>
      </b-collapse>
    </b-card>

    <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button block href="#" v-b-toggle.accordion-3 variant="info"> <b> Service Name </b> :  DJT Timer</b-button>
      </b-card-header>
      <b-collapse id="accordion-3" accordion="my-accordion" role="tabpanel">
        <b-card-body>
          <div class="row" style="padding:12px">
                  <JsonEditor v-model="schema"/>
                  <hr>
                  <b-card>
                    <pre class="json"> {{JsonString | pretty}} </pre> 
                  </b-card> 
            </div> 
            <input type="submit" value="Send Message">
            <input type="submit" value="Reset">
        </b-card-body>
      </b-collapse>
    </b-card>
  </div>
</template>

<script>
import JsonEditor  from './JsonEditor.vue';
  export default {
    data() {
      return {
          schema:
        [
            {
                "eventLogReport": 
                {
                "patternId": 1,
                "triggerId": 1,
                "triggerTime": 1,
                "specificData": {},
                "dataContentReport": 
                {
                    "duration": 1,
                    "dataContentId": 1,
                    "data": []
                }
                }
            }
        ],
      }
    }
    ,computed:
    {
        JsonString:function()
        {
            return JSON.stringify(this.schema, null,2 ).trim(); 
        }
    },
    filters:
    {
        pretty: function(value) 
        {
        return JSON.stringify(JSON.parse(value), null, 2);
        }
    },
    components:
    {
        JsonEditor
    }
  }
</script>