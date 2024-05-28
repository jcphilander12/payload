import type { Transformer } from '@lexical/markdown'
import type { GenericLanguages, I18n } from '@payloadcms/translations'
import type { JSONSchema4 } from 'json-schema'
import type { Klass, LexicalEditor, LexicalNode, SerializedEditorState } from 'lexical'
import type { SerializedLexicalNode } from 'lexical'
import type { LexicalNodeReplacement } from 'lexical'
import type { RequestContext } from 'payload'
import type { SanitizedConfig } from 'payload/config'
import type {
  Field,
  PayloadRequestWithData,
  ReplaceAny,
  RichTextField,
  ValidateOptions,
} from 'payload/types'
import type React from 'react'

import type { AdapterProps } from '../../types.js'
import type { ClientEditorConfig, ServerEditorConfig } from '../lexical/config/types.js'
import type { SlashMenuGroup } from '../lexical/plugins/SlashMenu/LexicalTypeaheadMenuPlugin/types.js'
import type { HTMLConverter } from './converters/html/converter/types.js'
import type { ToolbarGroup } from './toolbars/types.js'

export type PopulationPromise<T extends SerializedLexicalNode = SerializedLexicalNode> = ({
  context,
  currentDepth,
  depth,
  editorPopulationPromises,
  field,
  fieldPromises,
  findMany,
  flattenLocales,
  node,
  overrideAccess,
  populationPromises,
  req,
  showHiddenFields,
  siblingDoc,
}: {
  context: RequestContext
  currentDepth: number
  depth: number
  draft: boolean
  /**
   * This maps all population promises to the node type
   */
  editorPopulationPromises: Map<string, Array<PopulationPromise>>
  field: RichTextField<SerializedEditorState, AdapterProps>
  /**
   * fieldPromises are used for things like field hooks. They will be awaited before awaiting populationPromises
   */
  fieldPromises: Promise<void>[]
  findMany: boolean
  flattenLocales: boolean
  node: T
  overrideAccess: boolean
  populationPromises: Promise<void>[]
  req: PayloadRequestWithData
  showHiddenFields: boolean
  siblingDoc: Record<string, unknown>
}) => void

export type NodeValidation<T extends SerializedLexicalNode = SerializedLexicalNode> = ({
  node,
  nodeValidations,
  validation,
}: {
  node: T
  nodeValidations: Map<string, Array<NodeValidation>>
  validation: {
    options: ValidateOptions<unknown, unknown, RichTextField>
    value: SerializedEditorState
  }
}) => Promise<string | true> | string | true

export type FeatureProviderProviderServer<ServerFeatureProps, ClientFeatureProps> = (
  props?: ServerFeatureProps,
) => FeatureProviderServer<ServerFeatureProps, ClientFeatureProps>

export type FeatureProviderServer<ServerFeatureProps, ClientFeatureProps> = {
  /** Keys of dependencies needed for this feature. These dependencies do not have to be loaded first */
  dependencies?: string[]
  /** Keys of priority dependencies needed for this feature. These dependencies have to be loaded first and are available in the `feature` property*/
  dependenciesPriority?: string[]
  /** Keys of soft-dependencies needed for this feature. The FeatureProviders dependencies are optional, but are considered as last-priority in the loading process */
  dependenciesSoft?: string[]

  /**
   * This is being called during the payload sanitization process
   */
  feature: (props: {
    config: SanitizedConfig
    /** unSanitizedEditorConfig.features, but mapped */
    featureProviderMap: ServerFeatureProviderMap
    isRoot?: boolean
    // other resolved features, which have been loaded before this one. All features declared in 'dependencies' should be available here
    resolvedFeatures: ResolvedServerFeatureMap
    // unSanitized EditorConfig,
    unSanitizedEditorConfig: ServerEditorConfig
  }) =>
    | Promise<ServerFeature<ServerFeatureProps, ClientFeatureProps>>
    | ServerFeature<ServerFeatureProps, ClientFeatureProps>
  key: string
  /** Props which were passed into your feature will have to be passed here. This will allow them to be used / read in other places of the code, e.g. wherever you can use useEditorConfigContext */
  serverFeatureProps: ServerFeatureProps
}

export type FeatureProviderProviderClient<ClientFeatureProps> = (
  props: ClientComponentProps<ClientFeatureProps>,
) => FeatureProviderClient<ClientFeatureProps>

/**
 * No dependencies => Features need to be sorted on the server first, then sent to client in right order
 */
export type FeatureProviderClient<ClientFeatureProps> = {
  /**
   * Return props, to make it easy to retrieve passed in props to this Feature for the client if anyone wants to
   */
  clientFeatureProps: ClientComponentProps<ClientFeatureProps>
  feature: (props: {
    clientFunctions: Record<string, any>
    /** unSanitizedEditorConfig.features, but mapped */
    featureProviderMap: ClientFeatureProviderMap
    // other resolved features, which have been loaded before this one. All features declared in 'dependencies' should be available here
    resolvedFeatures: ResolvedClientFeatureMap
    // unSanitized EditorConfig,
    unSanitizedEditorConfig: ClientEditorConfig
  }) => ClientFeature<ClientFeatureProps>
}

export type PluginComponent<ClientFeatureProps = any> = React.FC<{
  clientProps: ClientFeatureProps
}>
export type PluginComponentWithAnchor<ClientFeatureProps = any> = React.FC<{
  anchorElem: HTMLElement
  clientProps: ClientFeatureProps
}>

export type ClientFeature<ClientFeatureProps> = {
  /**
   * Return props, to make it easy to retrieve passed in props to this Feature for the client if anyone wants to
   */
  clientFeatureProps: ClientComponentProps<ClientFeatureProps>
  hooks?: {
    load?: ({
      incomingEditorState,
    }: {
      incomingEditorState: SerializedEditorState
    }) => SerializedEditorState
    save?: ({
      incomingEditorState,
    }: {
      incomingEditorState: SerializedEditorState
    }) => SerializedEditorState
  }
  markdownTransformers?: Transformer[]
  nodes?: Array<Klass<LexicalNode> | LexicalNodeReplacement>
  /**
   * Plugins are react components which get added to the editor. You can use them to interact with lexical, e.g. to create a command which creates a node, or opens a modal, or some other more "outside" functionality
   */
  plugins?: Array<
    | {
        // plugins are anything which is not directly part of the editor. Like, creating a command which creates a node, or opens a modal, or some other more "outside" functionality
        Component: PluginComponent<ClientFeatureProps>
        position: 'aboveContainer' // Determines at which position the Component will be added.
      }
    | {
        // plugins are anything which is not directly part of the editor. Like, creating a command which creates a node, or opens a modal, or some other more "outside" functionality
        Component: PluginComponent<ClientFeatureProps>
        position: 'bottom' // Determines at which position the Component will be added.
      }
    | {
        // plugins are anything which is not directly part of the editor. Like, creating a command which creates a node, or opens a modal, or some other more "outside" functionality
        Component: PluginComponent<ClientFeatureProps>
        position: 'normal' // Determines at which position the Component will be added.
      }
    | {
        // plugins are anything which is not directly part of the editor. Like, creating a command which creates a node, or opens a modal, or some other more "outside" functionality
        Component: PluginComponent<ClientFeatureProps>
        position: 'top' // Determines at which position the Component will be added.
      }
    | {
        // plugins are anything which is not directly part of the editor. Like, creating a command which creates a node, or opens a modal, or some other more "outside" functionality
        Component: PluginComponentWithAnchor<ClientFeatureProps>
        position: 'floatingAnchorElem' // Determines at which position the Component will be added.
      }
    | {
        Component: PluginComponent<ClientFeatureProps>
        position: 'belowContainer' // Determines at which position the Component will be added.
      }
  >
  slashMenu?: {
    /**
     * Dynamic groups allow you to add different groups depending on the query string (so, the text after the slash).
     * Thus, to re-calculate the available groups, this function will be called every time you type after the /.
     *
     * The groups provided by dynamicGroups will be merged with the static groups provided by the groups property.
     */
    dynamicGroups?: ({
      editor,
      queryString,
    }: {
      editor: LexicalEditor
      queryString: string
    }) => SlashMenuGroup[]
    /**
     * Static array of groups together with the items in them. These will always be present.
     * While typing after the /, they will be filtered by the query string and the keywords, key and display name of the items.
     */
    groups?: SlashMenuGroup[]
  }
  /**
   * An opt-in, classic fixed toolbar which stays at the top of the editor
   */
  toolbarFixed?: {
    groups: ToolbarGroup[]
  }
  /**
   * The default, floating toolbar which appears when you select text.
   */
  toolbarInline?: {
    /**
     * Array of toolbar groups / sections. Each section can contain multiple toolbar items.
     */
    groups: ToolbarGroup[]
  }
}

export type ClientComponentProps<ClientFeatureProps> = ClientFeatureProps extends undefined
  ? {
      featureKey: string
      order: number
    }
  : {
      featureKey: string
      order: number
    } & ClientFeatureProps

export type FieldNodeHookArgs<T extends SerializedLexicalNode> = {
  context: RequestContext
  /** Boolean to denote if this hook is running against finding one, or finding many within the afterRead hook. */
  findMany?: boolean
  /** The value of the field. */
  node?: T
  /** A string relating to which operation the field type is currently executing within. Useful within beforeValidate, beforeChange, and afterChange hooks to differentiate between create and update operations. */
  operation?: 'create' | 'delete' | 'read' | 'update'
  overrideAccess?: boolean
  /** The Express request object. It is mocked for Local API operations. */
  req: PayloadRequestWithData
}

export type FieldNodeHook<T extends SerializedLexicalNode> = (
  args: FieldNodeHookArgs<T>,
) => Promise<T> | T

// Define the node with hooks that use the node's exportJSON return type
export type NodeWithHooks<T extends LexicalNode = any> = {
  converters?: {
    html?: HTMLConverter<ReturnType<ReplaceAny<T, LexicalNode>['exportJSON']>>
  }
  hooks?: {
    afterChange?: Array<FieldNodeHook<ReturnType<ReplaceAny<T, LexicalNode>['exportJSON']>>>
    afterRead?: Array<FieldNodeHook<ReturnType<ReplaceAny<T, LexicalNode>['exportJSON']>>>
    beforeChange?: Array<FieldNodeHook<ReturnType<ReplaceAny<T, LexicalNode>['exportJSON']>>>
    /**
     * Runs before a document is duplicated to prevent errors in unique fields or return null to use defaultValue.
     */
    beforeDuplicate?: Array<FieldNodeHook<ReturnType<ReplaceAny<T, LexicalNode>['exportJSON']>>>
    beforeValidate?: Array<FieldNodeHook<ReturnType<ReplaceAny<T, LexicalNode>['exportJSON']>>>
  }
  node: Klass<T> | LexicalNodeReplacement
  populationPromises?: Array<
    PopulationPromise<ReturnType<ReplaceAny<T, LexicalNode>['exportJSON']>>
  >
  validations?: Array<NodeValidation<ReturnType<ReplaceAny<T, LexicalNode>['exportJSON']>>>
}

export type ServerFeature<ServerProps, ClientFeatureProps> = {
  ClientComponent?: React.FC<ClientComponentProps<ClientFeatureProps>>
  /**
   * This determines what props will be available on the Client.
   */
  clientFeatureProps?: ClientFeatureProps
  generateComponentMap?: (args: {
    config: SanitizedConfig
    i18n: I18n
    props: ServerProps
    schemaPath: string
  }) => {
    [key: string]: React.FC<{ componentKey: string; featureKey: string }>
  }
  generateSchemaMap?: (args: {
    config: SanitizedConfig
    i18n: I18n
    props: ServerProps
    schemaMap: Map<string, Field[]>
    schemaPath: string
  }) => Map<string, Field[]> | null
  generatedTypes?: {
    modifyOutputSchema: ({
      collectionIDFieldTypes,
      config,
      currentSchema,
      field,
      interfaceNameDefinitions,
      isRequired,
    }: {
      collectionIDFieldTypes: { [key: string]: 'number' | 'string' }
      config?: SanitizedConfig
      /**
       * Current schema which will be modified by this function.
       */
      currentSchema: JSONSchema4
      field: RichTextField<SerializedEditorState, AdapterProps>
      /**
       * Allows you to define new top-level interfaces that can be re-used in the output schema.
       */
      interfaceNameDefinitions: Map<string, JSONSchema4>
      isRequired: boolean
    }) => JSONSchema4
  }
  /**
   * Here you can provide i18n translations for your feature. These will only be available on the server.
   *
   * Translations here are automatically scoped to `lexical.featureKey.yourKey`
   *
   * @Example
   * ```ts
   * i18n: {
   *   en: {
   *     label: 'Horizontal Rule',
   *   },
   *   de: {
   *     label: 'Trennlinie',
   *   },
   * }
   * ```
   * In order to access these translations on the server, you would use `i18n.t('lexical:horizontalRule:label')`.
   * If you want to access them on both the server and the client, you will have to add them to your ClientFeature as well.
   */
  i18n?: Partial<GenericLanguages>
  markdownTransformers?: Transformer[]
  nodes?: Array<NodeWithHooks>

  /** Props which were passed into your feature will have to be passed here. This will allow them to be used / read in other places of the code, e.g. wherever you can use useEditorConfigContext */
  serverFeatureProps: ServerProps
}

export type ResolvedServerFeature<ServerProps, ClientFeatureProps> = ServerFeature<
  ServerProps,
  ClientFeatureProps
> &
  Required<
    Pick<
      FeatureProviderServer<ServerProps, ClientFeatureProps>,
      'dependencies' | 'dependenciesPriority' | 'dependenciesSoft' | 'key'
    >
  > & {
    order: number
  }

export type ResolvedClientFeature<ClientFeatureProps> = ClientFeature<ClientFeatureProps> & {
  key: string
  order: number
}

export type ResolvedServerFeatureMap = Map<string, ResolvedServerFeature<unknown, unknown>>
export type ResolvedClientFeatureMap = Map<string, ResolvedClientFeature<unknown>>

export type ServerFeatureProviderMap = Map<string, FeatureProviderServer<unknown, unknown>>
export type ClientFeatureProviderMap = Map<string, FeatureProviderClient<unknown>>

/**
 * Plugins are react components which get added to the editor. You can use them to interact with lexical, e.g. to create a command which creates a node, or opens a modal, or some other more "outside" functionality
 */
export type SanitizedPlugin =
  | {
      // plugins are anything which is not directly part of the editor. Like, creating a command which creates a node, or opens a modal, or some other more "outside" functionality
      Component: PluginComponent
      clientProps: any
      key: string
      position: 'bottom' // Determines at which position the Component will be added.
    }
  | {
      // plugins are anything which is not directly part of the editor. Like, creating a command which creates a node, or opens a modal, or some other more "outside" functionality
      Component: PluginComponent
      clientProps: any
      key: string
      position: 'normal' // Determines at which position the Component will be added.
    }
  | {
      // plugins are anything which is not directly part of the editor. Like, creating a command which creates a node, or opens a modal, or some other more "outside" functionality
      Component: PluginComponent
      clientProps: any
      key: string
      position: 'top' // Determines at which position the Component will be added.
    }
  | {
      // plugins are anything which is not directly part of the editor. Like, creating a command which creates a node, or opens a modal, or some other more "outside" functionality
      Component: PluginComponentWithAnchor
      clientProps: any
      desktopOnly?: boolean
      key: string
      position: 'floatingAnchorElem' // Determines at which position the Component will be added.
    }
  | {
      Component: PluginComponent
      clientProps: any
      key: string
      position: 'aboveContainer'
    }
  | {
      Component: PluginComponent
      clientProps: any
      key: string
      position: 'belowContainer'
    }

export type SanitizedServerFeatures = Required<
  Pick<ResolvedServerFeature<unknown, unknown>, 'i18n' | 'markdownTransformers' | 'nodes'>
> & {
  /**  The node types mapped to their converters */
  converters: {
    html: HTMLConverter[]
  }
  /** The keys of all enabled features */
  enabledFeatures: string[]
  generatedTypes: {
    modifyOutputSchemas: Array<
      ({
        collectionIDFieldTypes,
        config,
        currentSchema,
        field,
        interfaceNameDefinitions,
        isRequired,
      }: {
        collectionIDFieldTypes: { [key: string]: 'number' | 'string' }
        config?: SanitizedConfig
        /**
         * Current schema which will be modified by this function.
         */
        currentSchema: JSONSchema4
        field: RichTextField<SerializedEditorState, AdapterProps>
        /**
         * Allows you to define new top-level interfaces that can be re-used in the output schema.
         */
        interfaceNameDefinitions: Map<string, JSONSchema4>
        isRequired: boolean
      }) => JSONSchema4
    >
  }
  /**  The node types mapped to their hooks */

  hooks?: {
    afterChange?: Map<string, Array<FieldNodeHook<SerializedLexicalNode>>>
    afterRead?: Map<string, Array<FieldNodeHook<SerializedLexicalNode>>>
    beforeChange?: Map<string, Array<FieldNodeHook<SerializedLexicalNode>>>
    /**
     * Runs before a document is duplicated to prevent errors in unique fields or return null to use defaultValue.
     */
    beforeDuplicate?: Map<string, Array<FieldNodeHook<SerializedLexicalNode>>>
    beforeValidate?: Map<string, Array<FieldNodeHook<SerializedLexicalNode>>>
  } /**  The node types mapped to their populationPromises */
  populationPromises: Map<string, Array<PopulationPromise>>
  /**  The node types mapped to their validations */
  validations: Map<string, Array<NodeValidation>>
}

export type SanitizedClientFeatures = Required<
  Pick<
    ResolvedClientFeature<unknown>,
    'markdownTransformers' | 'nodes' | 'toolbarFixed' | 'toolbarInline'
  >
> & {
  /** The keys of all enabled features */
  enabledFeatures: string[]
  hooks: {
    load: Array<
      ({
        incomingEditorState,
      }: {
        incomingEditorState: SerializedEditorState
      }) => SerializedEditorState
    >
    save: Array<
      ({
        incomingEditorState,
      }: {
        incomingEditorState: SerializedEditorState
      }) => SerializedEditorState
    >
  }
  /**
   * Plugins are react components which get added to the editor. You can use them to interact with lexical, e.g. to create a command which creates a node, or opens a modal, or some other more "outside" functionality
   */
  plugins?: Array<SanitizedPlugin>
  slashMenu: {
    /**
     * Dynamic groups allow you to add different groups depending on the query string (so, the text after the slash).
     * Thus, to re-calculate the available groups, this function will be called every time you type after the /.
     *
     * The groups provided by dynamicGroups will be merged with the static groups provided by the groups property.
     */
    dynamicGroups: Array<
      ({ editor, queryString }: { editor: LexicalEditor; queryString: string }) => SlashMenuGroup[]
    >
    /**
     * Static array of groups together with the items in them. These will always be present.
     * While typing after the /, they will be filtered by the query string and the keywords, key and display name of the items.
     */
    groups: SlashMenuGroup[]
  }
}
