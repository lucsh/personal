import {createGlobalStyle} from "styled-components";

export default createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New',
    monospace;
    -webkit-font-smoothing: antialiased;
    font-size: 1rem;
    font-weight: normal;
    line-height: 1.5;
    color: #fff;
    background-color: #181718;
    height: 100%;
    width: 100%;
  }
  body,html {
    margin: 0;
    padding: 0;
  }
  * {
    box-sizing: border-box;
  }

  ::selection {
    background: #fff;
    color: #181718;
  }

  ::-moz-selection {
    background: #fff;
    color: #181718;
  }
  a {
    color: #eee;
    text-decoration: none;
    display: inline-block;
    :hover {
      color: #fff;
    }
    :after {
      display: block;
      content: "";
      border-bottom: solid 1px #0773a7;
      transform: scaleX(0);
      transition: transform 250ms ease-in-out;
      transform-origin: 0 50%;
    }

    :hover:after {
      transform: scaleX(1);
      transform-origin: 0 50%;
    }
  }

  /** Logo Animation
      462 is the line lenght
    */

  .path {
    stroke: #fff;
    stroke-dasharray: 462;
    stroke-dashoffset: 462;
    animation: dash 2.5s linear forwards;
    animation-delay: 0.25s;
    animation-iteration-count: 1;
  }

  .backpath {
    stroke: #333;
    width: 1;
    stroke-dasharray: 462;
    stroke-dashoffset: 462;
    animation: dash 2.25s linear forwards;
    animation-iteration-count: 1;
  }

  @keyframes dash {
    to {
      stroke-dashoffset: 0;
    }
  }

  .polygon_top,
  .polygon_right,
  .polygon_left {
    fill: #181718;
    stroke: #181718;
    transition: all 0.5s ease;
    animation: move_y 2.5s linear forwards;
    animation-delay: 0.25s;
    animation-iteration-count: 1;
  }


  ._polygon_top{
    fill: #fff;
    stroke: none;
    transform: translateY(-30px);
    transition: all 1s cubic-bezier(0.5, 0.2, 0.3, 1.0);
    animation: move_yt 1s cubic-bezier(0.5, 0.2, 0.3, 1.0) infinite alternate;
    animation-delay: 0.25s;
  }

  ._polygon_right{
    fill: #fff;
    stroke: none;
    transform: translateX(30px);
    transition: all 1s cubic-bezier(0.5, 0.2, 0.3, 1.0);
    animation: move_xr 1s cubic-bezier(0.5, 0.2, 0.3, 1.0) infinite alternate;
    animation-delay: 0.25s;
  }

  ._polygon_left {
    fill: #fff;
    stroke: none;
    transform: translateX(-30px);
    transition: all 1s cubic-bezier(0.5, 0.2, 0.3, 1.0);
    animation: move_xl 1s cubic-bezier(0.5, 0.2, 0.3, 1.0) infinite alternate;
    animation-delay: 0.25s;
  }

  @keyframes move_xl {
    to {
      transform: translateX(0px)
    }
  }

  @keyframes move_xr {
    to {
      transform: translateX(0px)
    }
  }

  @keyframes move_yt {
    to {
      transform: translateY(-7px)
    }
  }

  .polygon_top:hover,
  .polygon_right:hover,
  .polygon_left:hover {
    fill: #fff;
    stroke: #fff;
  }
`
