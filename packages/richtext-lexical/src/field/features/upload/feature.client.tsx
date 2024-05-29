'use client'

import { $isNodeSelection } from 'lexical'

import type { FeatureProviderProviderClient } from '../types.js'

import { UploadIcon } from '../../lexical/ui/icons/Upload/index.js'
import { createClientComponent } from '../createClientComponent.js'
import { slashMenuBasicGroupWithItems } from '../shared/slashMenu/basicGroup.js'
import { toolbarAddDropdownGroupWithItems } from '../shared/toolbar/addDropdownGroup.js'
import { INSERT_UPLOAD_WITH_DRAWER_COMMAND } from './drawer/commands.js'
import { $isUploadNode, UploadNode } from './nodes/UploadNode.js'
import { UploadPlugin } from './plugin/index.js'

export type UploadFeaturePropsClient = {
  collections: {
    [collection: string]: {
      hasExtraFields: boolean
    }
  }
}

const UploadFeatureClient: FeatureProviderProviderClient<UploadFeaturePropsClient> = (props) => {
  return {
    clientFeatureProps: props,
    feature: () => ({
      clientFeatureProps: props,
      nodes: [UploadNode],
      plugins: [
        {
          Component: UploadPlugin,
          position: 'normal',
        },
      ],
      slashMenu: {
        groups: [
          slashMenuBasicGroupWithItems([
            {
              Icon: UploadIcon,
              key: 'upload',
              keywords: ['upload', 'image', 'file', 'img', 'picture', 'photo', 'media'],
              label: ({ i18n }) => {
                return i18n.t('lexical:upload:label')
              },
              onSelect: ({ editor }) => {
                editor.dispatchCommand(INSERT_UPLOAD_WITH_DRAWER_COMMAND, {
                  replace: false,
                })
              },
            },
          ]),
        ],
      },
      toolbarFixed: {
        groups: [
          toolbarAddDropdownGroupWithItems([
            {
              ChildComponent: UploadIcon,
              isActive: ({ selection }) => {
                if (!$isNodeSelection(selection) || !selection.getNodes().length) {
                  return false
                }

                const firstNode = selection.getNodes()[0]
                return $isUploadNode(firstNode)
              },
              key: 'upload',
              label: ({ i18n }) => {
                return i18n.t('lexical:upload:label')
              },
              onSelect: ({ editor }) => {
                editor.dispatchCommand(INSERT_UPLOAD_WITH_DRAWER_COMMAND, {
                  replace: false,
                })
              },
            },
          ]),
        ],
      },
    }),
  }
}

export const UploadFeatureClientComponent = createClientComponent(UploadFeatureClient)
