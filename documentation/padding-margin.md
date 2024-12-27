# Padding and Margin Implementation Overview

This document provides an overview of how padding and margins are used across different CSS classes.

## Padding

- **Padding is used primarily to create space inside elements**, ensuring content does not touch the edges of the container.
- Common padding utilities used:
  - `px-*`: Horizontal padding (left and right).
  - `py-*`: Vertical padding (top and bottom).
  - `pr-*`, `pl-*`: Right and left padding.
  - `pt-*`, `pb-*`: Top and bottom padding.

### Examples:
- `.section`: `px-8` (horizontal padding)
- `.btn`: `py-2` (vertical padding)
- `.select`: `px-4 py-1 pr-8` (all-around padding with extra right padding)

## Margin

- **Margin is used to create space outside elements**, affecting the positioning relative to other elements.
- Common margin utilities used:
  - `mx-*`, `my-*`: Horizontal and vertical margins.
  - `mt-*`, `mb-*`: Top and bottom margins.
  - `ml-*`, `mr-*`: Left and right margins.

### Examples:
- `.otp-expires`: `my-4` (vertical margin)
- `.label`: `mb-2 mt-2` (top and bottom margins)
- `.logo`: `mr-2` (right margin)

## How we use Margins and Paddings
- we define classes inside app.css global file and particular class will used in various tags inside svelte files. 

## Summary

- **Padding** is applied for internal spacing and ensures content doesn’t touch the container’s edges.
- **Margin** is applied for external spacing and positioning of elements relative to others.
