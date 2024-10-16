/**
 * Copyright 2024 izzabizz5
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

/**
 * `un-sdg`
 * 
 * @demo index.html
 * @element un-sdg
 */
export class unSdg extends DDDSuper((LitElement)) {

  static get tag() {
    return "un-sdg";
  }

  constructor() {
    super();
    this.title = "";
    this.goal = "1";
    this.label = "";
    this.width = "256px";
    this.height = "256px";
    this.fetchPriority = "low";
    this.colorOnly = false;
  }

  // defines properties
  static get properties() {
    return {
      title: { type: String },
      goal: { type: String, reflect: true},
      label: { type: String },
      height: { type: String },
      width: { type: String },
      fetchPriority: { type: String },
      colorOnly: { type: Boolean },

    };
  }

  // Lit scoped styles and variables for the background colors
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: inline-flex;
        color: var(--ddd-theme-primary);
        --un-sdg-width: 254px;
        --un-sdg-height: 254px;
        background-color: white;
        --un-sdg-goal-1:#EB1C2C;
        --un-sdg-goal-2:#D2A02A;
        --un-sdg-goal-3:#2C9B48;
        --un-sdg-goal-4:#C21F33;
        --un-sdg-goal-5:#EF402A;
        --un-sdg-goal-6:#00ADD8;
        --un-sdg-goal-7:#FDB713;
        --un-sdg-goal-8:#8F1737;
        --un-sdg-goal-9:#F36D24;
        --un-sdg-goal-10:#E01583;
        --un-sdg-goal-11:#F99D25;
        --un-sdg-goal-12:#CF8D2A;
        --un-sdg-goal-13:#48773D;
        --un-sdg-goal-14:#007DBB;
        --un-sdg-goal-15:#3FAF49;
        --un-sdg-goal-16:#01558A;
        --un-sdg-goal-17:#193667;
        
        font-family: var(--ddd-font-navigation);
      }
      .wrapper {
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
        border-radius: 8px;
      }
      h3 span {
        font-size: var(--un-sdg-label-font-size, var(--ddd-font-size-s));
      }
      .color-block {
        width: var(--un-sdg-width, 254px);
        height: var(--un-sdg-height, 254px);
        border-radius: 8px;
      }
      img {
        width: var(--un-sdg-width, 254px);
        height: var(--un-sdg-height, 254px);
        border-radius: 8px;
        border-color: var(--un-sdg-goal-color);
      }
      .sdg-wrapper {
        width: var(--un-sdg-width, 254px);
        height: var(--un-sdg-height, 254px);
        background-color: var(--un-sdg-goal-color, #000);
        border-radius: 8px;
      }
    `];
  }

  // method to verify goal exists and if it does then update some properties to accurately show on the web
  updated(changedProperties) {
    if (changedProperties.has("goal")) {
      this.updateGoal();
    }
  }

  // sets some variables and makes every reference throughout useable
  updateGoal() {
    this.imgSrc = new URL(`../src/lib/svgs/goal-${this.goal}.svg`, import.meta.url).href; // update image (svg)
    this.label = this.getGoalName(this.goal); // update the label based on the goal
    this.altText = this.label || `Goal: ${this.goal}`; // update the text
    const colorVar = `--goal-${this.goal}`; //create color variable to set the background-color
    this.style.setProperty("--un-sdg-goal-color", `var(${colorVar})`); // sets the background-color
  }

  // svg labels
  getGoalName(goal) {
    const names = {
      '1': 'No Poverty',
      '2': 'Zero Hunger',
      '3': 'Good Health and Well-being',
      '4': 'Quality Education',
      '5': 'Gender Equality',
      '6': 'Clean Water and Sanitation',
      '7': 'Affordable and Clean Energy',
      '8': 'Decent Work and Economic Growth',
      '9': 'Industry, Innovation, and Infrastructure',
      '10': 'Reduced Inequality',
      '11': 'Sustainable Cities and Communities',
      '12': 'Responsible Consumption and Production',
      '13': 'Climate Action',
      '14': 'Life Below Water',
      '15': 'Life on Land',
      '16': 'Peace and Justice Strong Institutions',
      '17': 'Partnerships for the Goals',
    };

    return names[goal] || 'Goal'; // returning them
  }

  // Lit render the HTML
  render() {
    let imgSrc = new URL(`../lib/svgs/goal-${this.goal}.svg`, import.meta.url).href;
    if (this.goal === "all") { // if the goal is all then output the all image
      imgSrc = new URL(`../lib/svgs/${this.goal}.svg`, import.meta.url).href;
    }
    else if (this.goal === "circle") { // if the goal is circle then output the circle image
      imgSrc = new URL(`../lib/svgs/${this.goal}.png`, import.meta.url).href;
    }
    if (this.colorOnly) { // this is a way to output all the images with just the background colors
      return html`
      <div class="color-block" style="background-color: var(--un-sdg-goal-${this.goal})"></div>
      `;
    }
    return html`
    <div class="sdg-wrapper" style="background-color: var(--un-sdg-goal-${this.goal})"> 
        <img 
        src="${(imgSrc)}" 
        alt="${this.label}"
        loading="${this.loading}" 
        fetchPriority="${this.fetchPriority}"
        />
    </div>
    `;
  }

  static get haxProperties() {
    return new URL(`../src/lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(unSdg.tag, unSdg);