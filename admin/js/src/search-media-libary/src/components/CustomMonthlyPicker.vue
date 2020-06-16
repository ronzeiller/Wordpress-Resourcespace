<template>
    <div class="vue-monthly-picker">
        <label>{{fieldDef.label}}</label>
        <div class="month-picker-wrapper"
            :class="{ 'active visible':showMenu }">
            <div class="month-year-label picker" type="text" autocomplete="off" tabindex="0" @click="openMenu">
                <div @click="openMenu"
                    class="month-year-display"
                    :disabled="disabled"
                    :class="[inputClass, {'placeholder': !value}]">
                    <div class="display-text" :class="'display-text-'+alignment" :style="[{'text-align': alignment}]">{{displayText}}</div>
                    <span class="vmp-input-append" @click.stop.prevent="clearSelect" v-if="clearOption && value">
                    <i class="vmp-clear-icon"/>
                    </span>
                </div>
            </div>
            <div class="text"></div>
            <div class="date-popover" :class="menuClass" :style="menuStyle" tabindex="-1">
                <div class="picker" style="text-align: center">
                <div class="flexbox">
                    <span class="prev" @click="prevYear" :class="{deactive: !canBack}"></span>
                    <div>{{year}}</div>
                    <span class="next" @click="nextYear" :class="{deactive: !canNext}"></span>
                </div>
                <div class="flexbox monthItem">
                    <template v-for="(month, idx) in monthLabels">
                        <div class="item active"
                            :class="{'selected': isCurrentSelected(year, idx)}"
                            :style="[{'background-color': getBackgroundColor(year, idx)}]"
                            v-if="isActive(idx)"
                            @click="selectMonth(idx)"
                            :key="idx">{{month}}
                        </div>
                        <div v-else
                            :class="{'selected': isCurrentSelected(year, idx)}"
                            :key="idx"
                            class="item deactive">
                            {{ month }}
                        </div>
                    </template>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'CustomMonthlyPicker',
        props: {
            fieldDef:{},
            'value': {
              default: null
            },
            'disabled': {
              type: Boolean,
              default: false
            },
            'inputClass': {
              default: 'input'
            },
            'placeHolder': {
              type: String,
              default: ''
            },
            'alignment': {
              type: String,
              default: 'left',
              validator: function (value) {
                // The value must match one of these strings
                return ['left', 'right', 'center'].indexOf(value) !== -1
              }
            },
            'selectedBackgroundColor': {
              type: String,
              default: '#007bff'
            },
            monthLabels: {
              type: Array,
              default: function () {
                return ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
              }
            },
            min: {
              default: null
            },
            max: {
              default: null
            },
            dateFormat: {
              type: String,
              default: 'YYYY/MM'
            },
            clearOption: {
              type: Boolean,
              default: true
            }
        },
        data () {
            return {
              showMenu: false,
              year: moment().format('YYYY'),
              month: moment().format('MM'),
              selected: false,
            }
        },
        mounted () {
            this.init()
        },
        watch: {
            value: function (value) {
                this.setValue(value)
            }
        },
        computed: {
            menuClass () {
              return {
                visible: this.showMenu,
                hidden: !this.showMenu
              }
            },
            menuStyle () {
              return {
                display: this.showMenu ? 'block' : 'none',
                'left': this.alignment === 'right' ? '100%' : this.alignment === 'center' ? '50%' : '',
                'transform': this.alignment === 'right' ? 'translate(-100%,0)' : this.alignment === 'center' ? 'translate(-50%,0)' : ''
              }
            },
            displayText () {
                var tmpText = '';
              if(this.selected){
                tmpText = this.year + '/' + this.month;
              }else{
                tmpText = '';
              }
              return tmpText;

            },
            canBack () {
              if (!this.min) return true
              const currentVal = this.internalMomentValue.clone().startOf('year')
              return this.min.isBefore(currentVal)
            },
            canNext () {
              if (!this.max) return true
              const currentVal = this.internalMomentValue.clone().endOf('year')
              return currentVal.isBefore(this.max)
            },
            internalMomentValue () {
              var yrMonth = this.year + '-0' + this.month
              if( this.month.length>1 ){
                yrMonth = this.year + '-' + this.month
              }
              return moment(yrMonth, 'YYYY-MM')
            }
        },
        methods: {
            init () {
              document.addEventListener('click', (e) => {
                if (this.$el && !this.$el.contains(e.target)) {
                  this.closeMenu()
                }
              }, false)
              this.setValue(this.value)
            },
            openMenu () {
              if (!this.disabled) {
                this.showMenu = true
              }
            },
            closeMenu () {
              this.showMenu = false
            },
            prevYear () {
              if (!this.canBack) return
              let newYear = parseInt(this.year) - 1
              this.year = newYear.toString()
            },
            nextYear () {
              if (!this.canNext) return
              let newYear = parseInt(this.year) + 1
              this.year = newYear.toString()
            },
            selectMonth (idx) {
              this.selected = true;
              this.month = (parseInt(idx) + 1).toString()
              this.selectPicker()
              this.closeMenu()
            },
            selectPicker () {
              this.$emit('input', this.internalMomentValue.clone()._i)
              this.$emit('selected', this.internalMomentValue.clone())
            },
            setValue (value) {
              if (typeof value === 'string') {
                value = moment(value)
              }
              if (value && value.isValid()) {
                this.month = value.format('MM')
                this.year = value.format('YYYY')
              }
            },
            isActive (idx) {
              let realMonth = idx + 1
              const yrMonth = this.year + '/' + (realMonth < 10 ? '0' + realMonth : realMonth)
              if (this.min && moment(yrMonth, 'YYYY/MM').isBefore(this.min)) {
                return false
              }
              if (this.max && moment(yrMonth, 'YYYY/MM').isAfter(this.max)) {
                return false
              }
              return true
            },
            isCurrentSelected (year, monthIdx) {
              if (!this.value) {
                return false
              }
              let checkValue = this.value
              if (typeof this.value === 'string') {
                checkValue = moment(this.value)
              }else{
                checkValue = moment();
              }
              if (checkValue && checkValue.isValid()) {
                const currentMonth = checkValue.format('MM')
                const currentYear = checkValue.format('YYYY')
                return Number(currentMonth) === Number(monthIdx + 1) && Number(currentYear) === Number(year)
              }
              return false
            },
            getBackgroundColor (year, monthIdx) {
              if (this.isCurrentSelected(year, monthIdx)) {
                return this.selectedBackgroundColor
              }
            },
            clearSelect () {
              this.selected = false;
              this.$emit('input', '')
              this.$emit('selected', null)
            }
        }

    }
</script>
<style scoped>
    .vue-monthly-picker{
        max-width:100%;
        width:300px;
    }
    .vue-monthly-picker .month-picker-wrapper{
        max-width:98%;
        width:280px;
    }
    
.vue-monthly-picker .picker .next:hover, .vue-monthly-picker .picker .prev:hover {
    cursor: pointer;
  }
  .vue-monthly-picker .picker .monthItem .item {
    border-top: 1px solid #d4d4d4;
  }
  .vue-monthly-picker .picker .monthItem .item.active:hover {
    cursor: pointer;
    background-color: #d4d4d4;
  }
  .vue-monthly-picker .picker .flexbox {
    padding: 0px;
    display: flex;
    flex-wrap: wrap;
  }
  .vue-monthly-picker .picker .flexbox div {
    flex-grow: 1;
    padding: 15px 0;
  }
  .vue-monthly-picker .picker .flexbox .item {
    flex: 1;
    flex-basis: 25%;
  }
  .vue-monthly-picker .placeholder {
    color: #8b8b8b;
  }
  .vue-monthly-picker .date-popover {
    overflow-x: hidden;
    overflow-y: hidden;
    outline: none;
    max-width: 350px;
    width: 100%;
    border-radius: 0 0 0.28571429rem 0.28571429rem;
    box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);
    background: #fff;
    transition: opacity 0.1s ease;
    position: absolute;
    margin: auto;
    z-index: 10;
    border: 1px solid #d4d4d4;
    font-size: 1rem;
    font-weight: 200;
  }
  .vue-monthly-picker .month-picker-wrapper {
    position: relative;
    display: block;
    min-width: 200px;
  }
  .vue-monthly-picker .month-year-label {
    outline: none;
  }
  .vue-monthly-picker .month-year-label .vmp-input-append {
    display: none;
  }
  .vue-monthly-picker .month-year-label:hover .vmp-input-append {
    display: block;
  }
  .vue-monthly-picker .text {
    position: relative;
    z-index: 2;
  }
  .vue-monthly-picker .month-year-display:hover {
    cursor: pointer;
  }
  .vue-monthly-picker .next, .vue-monthly-picker .prev {
    width: 16%;
    float: left;
    text-indent: -10000px;
    position: relative;
  }
  .vue-monthly-picker .next:after, .vue-monthly-picker .prev:after {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translateX(-50%) translateY(-50%);
    transform: translateX(-50%) translateY(-50%);
    border: 6px solid transparent;
  }
  .vue-monthly-picker .next:after {
    border-left: 10px solid #000;
    margin-left: 5px;
  }
  .vue-monthly-picker .next.deactive:hover {
    cursor: default;
  }
  .vue-monthly-picker .next.deactive:after {
    border-left: 10px solid #999999;
  }
  .vue-monthly-picker .prev:after {
    border-right: 10px solid #000;
    margin-left: -5px;
  }
  .vue-monthly-picker .prev.deactive:hover {
    cursor: default;
  }
  .vue-monthly-picker .prev.deactive:after {
    border-right: 10px solid #999999;
  }
  .vue-monthly-picker .input {
    -moz-appearance: none;
    -webkit-appearance: none;
    align-items: center;
    border: 1px solid transparent;
    border-radius: 3px;
    box-shadow: none;
    display: inline-flex;
    font-size: 18px;
    height: 25px;
    justify-content: flex-start;
    line-height: 1.5;
    padding: 2px calc(.625em - 1px);
    position: relative;
    vertical-align: top;
    background-color: #fff;
    border-color: #dbdbdb;
    color: #363636;
    box-shadow: inset 0 1px 2px rgba(10, 10, 10, 0.1);
    max-width: 100%;
    width: 91%;
  }
  .vue-monthly-picker .deactive {
    color: #999999;
  }
  .vue-monthly-picker .selected {
    color: #fff;
    text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25);
    font-weight: bold;
  }
  .vue-monthly-picker .display-text {
    width: 100%;
  }
  .vue-monthly-picker .display-text-right {
    margin-right: 20px;
  }
  .vue-monthly-picker .vmp-input-append {
    position: absolute;
    top: -10;
    right: 0;
    width: 30px;
    height: 100%;
    padding: 6px;
  }
  .vue-monthly-picker .vmp-clear-icon {
    display: inline-block;
    width: 100%;
    height: 100%;
    font-style: normal;
    color: #555;
    text-align: center;
    cursor: pointer;
  }
  .vue-monthly-picker .vmp-clear-icon:before {
    display: inline-block;
    content: '\2716';
    vertical-align: middle;
  }
  
</style>