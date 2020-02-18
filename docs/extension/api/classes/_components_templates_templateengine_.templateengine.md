---
id: "_components_templates_templateengine_.templateengine"
title: "TemplateEngine"
sidebar_label: "TemplateEngine"
---

[cds-for-code](../index.md) › [Globals](../globals.md) › ["components/Templates/TemplateEngine"](../modules/_components_templates_templateengine_.md) › [TemplateEngine](_components_templates_templateengine_.templateengine.md)

## Hierarchy

* **TemplateEngine**

## Index

### Properties

* [fileNameRegex](_components_templates_templateengine_.templateengine.md#static-private-filenameregex)

### Methods

* [analyzeTemplate](_components_templates_templateengine_.templateengine.md#static-analyzetemplate)
* [buildTemplateContext](_components_templates_templateengine_.templateengine.md#static-private-buildtemplatecontext)
* [executeCommands](_components_templates_templateengine_.templateengine.md#static-private-executecommands)
* [executeTemplate](_components_templates_templateengine_.templateengine.md#static-executetemplate)

### Object literals

* [dotSettings](_components_templates_templateengine_.templateengine.md#static-private-dotsettings)

## Properties

### `Static` `Private` fileNameRegex

▪ **fileNameRegex**: *RegExp‹›* = /\$\{([\s\S]+?)\}/g

Defined in src/components/Templates/TemplateEngine.ts:15

## Methods

### `Static` analyzeTemplate

▸ **analyzeTemplate**(`templatePath`: string, `outputPath?`: string): *Promise‹[TemplateAnalysis](_components_templates_types_.templateanalysis.md)›*

Defined in src/components/Templates/TemplateEngine.ts:79

**Parameters:**

Name | Type |
------ | ------ |
`templatePath` | string |
`outputPath?` | string |

**Returns:** *Promise‹[TemplateAnalysis](_components_templates_types_.templateanalysis.md)›*

___

### `Static` `Private` buildTemplateContext

▸ **buildTemplateContext**(`templateAnalysis`: [TemplateAnalysis](_components_templates_types_.templateanalysis.md), ...`object`: any): *Promise‹[TemplateContext](_components_templates_types_.templatecontext.md)›*

Defined in src/components/Templates/TemplateEngine.ts:265

**Parameters:**

Name | Type |
------ | ------ |
`templateAnalysis` | [TemplateAnalysis](_components_templates_types_.templateanalysis.md) |
`...object` | any |

**Returns:** *Promise‹[TemplateContext](_components_templates_types_.templatecontext.md)›*

___

### `Static` `Private` executeCommands

▸ **executeCommands**(`templateContext`: [TemplateContext](_components_templates_types_.templatecontext.md), `stage`: [TemplateCommandExecutionStage](../enums/_components_templates_types_.templatecommandexecutionstage.md)): *Promise‹void›*

Defined in src/components/Templates/TemplateEngine.ts:227

**Parameters:**

Name | Type |
------ | ------ |
`templateContext` | [TemplateContext](_components_templates_types_.templatecontext.md) |
`stage` | [TemplateCommandExecutionStage](../enums/_components_templates_types_.templatecommandexecutionstage.md) |

**Returns:** *Promise‹void›*

___

### `Static` executeTemplate

▸ **executeTemplate**(`template`: [TemplateItem](_components_templates_types_.templateitem.md), `outputPath`: string, ...`object`: any): *Promise‹[TemplateContext](_components_templates_types_.templatecontext.md)›*

Defined in src/components/Templates/TemplateEngine.ts:32

**Parameters:**

Name | Type |
------ | ------ |
`template` | [TemplateItem](_components_templates_types_.templateitem.md) |
`outputPath` | string |
`...object` | any |

**Returns:** *Promise‹[TemplateContext](_components_templates_types_.templatecontext.md)›*

## Object literals

### `Static` `Private` dotSettings

### ▪ **dotSettings**: *object*

Defined in src/components/Templates/TemplateEngine.ts:16

###  append

• **append**: *true* = true

Defined in src/components/Templates/TemplateEngine.ts:28

###  conditional

• **conditional**: *RegExp‹›* = /\{\{\?(\?)?\s*([\s\S]*?)\s*\}\}\n?/g

Defined in src/components/Templates/TemplateEngine.ts:24

###  define

• **define**: *RegExp‹›* = /.*?\{\{##\s*([\w\.$]+)\s*(\:|=)([\s\S]+?)#\}\}\n?/g

Defined in src/components/Templates/TemplateEngine.ts:22

###  defineParams

• **defineParams**: *RegExp‹›* = /^\s*([\w$]+):([\s\S]+)/

Defined in src/components/Templates/TemplateEngine.ts:23

###  encode

• **encode**: *RegExp‹›* = /\{\{!([\s\S]+?)\}\}\n?/g

Defined in src/components/Templates/TemplateEngine.ts:19

###  evaluate

• **evaluate**: *RegExp‹›* = /\{\{([\s\S]+?)\}\}\n?/g

Defined in src/components/Templates/TemplateEngine.ts:17

###  interpolate

• **interpolate**: *RegExp‹›* = /\{\{=([\s\S]+?)\}\}/g

Defined in src/components/Templates/TemplateEngine.ts:18

###  iterate

• **iterate**: *RegExp‹›* = /\{\{~\s*(?:\}\}|([\s\S]+?)\s*\:\s*([\w$]+)\s*(?:\:\s*([\w$]+))?\s*\}\})\n?/g

Defined in src/components/Templates/TemplateEngine.ts:25

###  selfcontained

• **selfcontained**: *false* = false

Defined in src/components/Templates/TemplateEngine.ts:29

###  strip

• **strip**: *false* = false

Defined in src/components/Templates/TemplateEngine.ts:27

###  use

• **use**: *RegExp‹›* = /.*?\{\{#([\s\S]+?)\}\}\n?/g

Defined in src/components/Templates/TemplateEngine.ts:20

###  useParams

• **useParams**: *RegExp‹›* = /(^|[^\w$])def(?:\.|\[[\'\"])([\w$\.]+)(?:[\'\"]\])?\s*\:\s*([\w$\.]+|\"[^\"]+\"|\'[^\']+\'|\{[^\}]+\})/g

Defined in src/components/Templates/TemplateEngine.ts:21

###  varname

• **varname**: *string* = "$this"

Defined in src/components/Templates/TemplateEngine.ts:26