'use client';
import { Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import styles from './markdownToJSX.css';
import { useContext } from 'react';
import { AppContext } from '../contexts/appDetails';


export default function markdownToJSX() {
  const { file } = useContext(AppContext);
  const markdown = file.template;
  const lines = markdown.split('\n');
  let jsxContent = [];

  lines.forEach((line, index) => {
    if (line.startsWith('# ')) {
      jsxContent.push(<Text key={`h1-${index}`} style={styles.h1}>{line.substring(2)}</Text>);
    } else if (line.startsWith('## ')) {
      jsxContent.push(<Text key={`h2-${index}`} style={styles.h2}>{line.substring(3)}</Text>);
    } else {
      let paragraph = line;
      paragraph = paragraph.replace(/\*\*(.*?)\*\*/g, (_, content) =>
        jsxContent.push(<Text key={`bold-${index}`} style={styles.bold}>{content}</Text>)
      );
      paragraph = paragraph.replace(/\*(.*?)\*/g, (_, content) =>
        jsxContent.push(<Text key={`italic-${index}`} style={styles.italic}>{content}</Text>)
      );
      jsxContent.push(<Text key={`p-${index}`} style={styles.p}>{paragraph}</Text>);
    }
  });

  return jsxContent;
}

// // Example usage
const markdownString = `
# Legal Brief Template

## Title Page

**IN THE [Court Name]**

**Case No.:** [Insert Case Number]

**[Plaintiff's Name], Plaintiff,**

**v.**

**[Defendant's Name], Defendant.**

**BRIEF OF [Plaintiff/Defendant]**

**[Your Law Firm Name]**

**[Your Address]**

**[City, State, Zip Code]**

**[Phone Number]**

**[Email Address]**

**Attorneys for [Plaintiff/Defendant]**

---

## Table of Contents

1. [Introduction](#introduction)
2. [Statement of Facts](#statement-of-facts)
3. [Argument](#argument)
   1. [Issue 1](#issue-1)
   2. [Issue 2](#issue-2)
4. [Conclusion](#conclusion)

---

## Introduction

[Provide a brief introduction to the case and the key issues that will be addressed in the brief.]

---

## Statement of Facts

[Present a concise statement of facts relevant to the case. Ensure to present them in a logical, chronological order.]

---

## Argument

// ### Issue 1

// [Discuss the first issue. Present legal arguments supported by statutes, case law, and other relevant authorities.]

// #### Subheading (if needed)

// [Further details or specific arguments within Issue 1]

// ### Issue 2

// [Discuss the second issue, following the same format as for the first issue.]

// ---

// ## Conclusion

// [Summarize the main points of your argument and clearly state the relief or outcome you are seeking from the court.]

// ---

// ## Signature Block

// Respectfully submitted,

// **[Your Name]**

// [Your Title]

// [Date]

// ---
// `;

// console.log(markdownToJSX(markdownString));
