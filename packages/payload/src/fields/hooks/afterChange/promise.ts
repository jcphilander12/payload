/* eslint-disable no-param-reassign */
import type { SanitizedCollectionConfig } from '../../../collections/config/types.js'
import type { SanitizedGlobalConfig } from '../../../globals/config/types.js'
import type { PayloadRequestWithData, RequestContext } from '../../../types/index.js'
import type { Field, TabAsField } from '../../config/types.js'

import { fieldAffectsData, tabHasName } from '../../config/types.js'
import { getFieldPaths } from '../../getFieldPaths.js'
import { traverseFields } from './traverseFields.js'

type Args = {
  collection: SanitizedCollectionConfig | null
  context: RequestContext
  data: Record<string, unknown>
  doc: Record<string, unknown>
  field: Field | TabAsField
  global: SanitizedGlobalConfig | null
  operation: 'create' | 'update'
  /**
   * The parent's path. Should either be an empty string or end with a .
   */
  parentPath: string
  /**
   * The parent's schemaPath (path without indexes). Should either be an empty string or end with a .
   */
  parentSchemaPath: string
  previousDoc: Record<string, unknown>
  previousSiblingDoc: Record<string, unknown>
  req: PayloadRequestWithData
  siblingData: Record<string, unknown>
  siblingDoc: Record<string, unknown>
}

// This function is responsible for the following actions, in order:
// - Execute field hooks

export const promise = async ({
  collection,
  context,
  data,
  doc,
  field,
  global,
  operation,
  parentPath,
  parentSchemaPath,
  previousDoc,
  previousSiblingDoc,
  req,
  siblingData,
  siblingDoc,
}: Args): Promise<void> => {
  const { path: fieldPath, schemaPath: fieldSchemaPath } = getFieldPaths({
    field,
    parentPath,
    parentSchemaPath,
  })

  if (fieldAffectsData(field)) {
    // Execute hooks
    if (field.hooks?.afterChange) {
      await field.hooks.afterChange.reduce(async (priorHook, currentHook) => {
        await priorHook

        const hookedValue = await currentHook({
          collection,
          context,
          data,
          field,
          global,
          operation,
          originalDoc: doc,
          path: fieldPath,
          previousDoc,
          previousSiblingDoc,
          previousValue: previousDoc[field.name],
          req,
          schemaPath: fieldSchemaPath,
          siblingData,
          value: siblingData[field.name],
        })

        if (hookedValue !== undefined) {
          siblingDoc[field.name] = hookedValue
        }
      }, Promise.resolve())
    }
  }

  // Traverse subfields
  switch (field.type) {
    case 'group': {
      await traverseFields({
        collection,
        context,
        data,
        doc,
        fields: field.fields,
        global,
        operation,
        path: `${fieldPath}.`,
        previousDoc,
        previousSiblingDoc: previousDoc[field.name] as Record<string, unknown>,
        req,
        schemaPath: `${fieldSchemaPath}.`,
        siblingData: (siblingData?.[field.name] as Record<string, unknown>) || {},
        siblingDoc: siblingDoc[field.name] as Record<string, unknown>,
      })

      break
    }

    case 'array': {
      const rows = siblingDoc[field.name]

      if (Array.isArray(rows)) {
        const promises = []
        rows.forEach((row, i) => {
          promises.push(
            traverseFields({
              collection,
              context,
              data,
              doc,
              fields: field.fields,
              global,
              operation,
              path: `${fieldPath}.${i}.`,
              previousDoc,
              previousSiblingDoc: previousDoc?.[field.name]?.[i] || ({} as Record<string, unknown>),
              req,
              schemaPath: `${fieldSchemaPath}.`,
              siblingData: siblingData?.[field.name]?.[i] || {},
              siblingDoc: { ...row } || {},
            }),
          )
        })
        await Promise.all(promises)
      }
      break
    }

    case 'blocks': {
      const rows = siblingDoc[field.name]

      if (Array.isArray(rows)) {
        const promises = []
        rows.forEach((row, i) => {
          const block = field.blocks.find((blockType) => blockType.slug === row.blockType)

          if (block) {
            promises.push(
              traverseFields({
                collection,
                context,
                data,
                doc,
                fields: block.fields,
                global,
                operation,
                path: `${fieldPath}.${i}.`,
                previousDoc,
                previousSiblingDoc:
                  previousDoc?.[field.name]?.[i] || ({} as Record<string, unknown>),
                req,
                schemaPath: `${fieldSchemaPath}.`,
                siblingData: siblingData?.[field.name]?.[i] || {},
                siblingDoc: { ...row } || {},
              }),
            )
          }
        })
        await Promise.all(promises)
      }

      break
    }

    case 'row':
    case 'collapsible': {
      await traverseFields({
        collection,
        context,
        data,
        doc,
        fields: field.fields,
        global,
        operation,
        path: fieldPath,
        previousDoc,
        previousSiblingDoc: { ...previousSiblingDoc },
        req,
        schemaPath: fieldSchemaPath,
        siblingData: siblingData || {},
        siblingDoc: { ...siblingDoc },
      })

      break
    }

    case 'tab': {
      let tabSiblingData = siblingData
      let tabSiblingDoc = siblingDoc
      let tabPreviousSiblingDoc = siblingDoc

      if (tabHasName(field)) {
        tabSiblingData = siblingData[field.name] as Record<string, unknown>
        tabSiblingDoc = siblingDoc[field.name] as Record<string, unknown>
        tabPreviousSiblingDoc = previousDoc[field.name] as Record<string, unknown>
      }

      await traverseFields({
        collection,
        context,
        data,
        doc,
        fields: field.fields,
        global,
        operation,
        path: tabHasName(field) ? `${fieldPath}.` : fieldPath,
        previousDoc,
        previousSiblingDoc: tabPreviousSiblingDoc,
        req,
        schemaPath: tabHasName(field) ? `${fieldSchemaPath}.` : fieldSchemaPath,
        siblingData: tabSiblingData,
        siblingDoc: tabSiblingDoc,
      })

      break
    }

    case 'tabs': {
      await traverseFields({
        collection,
        context,
        data,
        doc,
        fields: field.tabs.map((tab) => ({ ...tab, type: 'tab' })),
        global,
        operation,
        path: fieldPath,
        previousDoc,
        previousSiblingDoc: { ...previousSiblingDoc },
        req,
        schemaPath: fieldSchemaPath,
        siblingData: siblingData || {},
        siblingDoc: { ...siblingDoc },
      })
      break
    }

    default: {
      break
    }
  }
}
