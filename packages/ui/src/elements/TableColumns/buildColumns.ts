import { CellProps, SanitizedCollectionConfig } from 'payload/types'
import { Column } from '../../elements/Table/types'
import { FieldMap } from '../../utilities/buildComponentMap/types'
import { ListPreferences } from '../../views/List/types'

export const buildColumns = (args: {
  useAsTitle: SanitizedCollectionConfig['admin']['useAsTitle']
  fieldMap: FieldMap
  cellProps: Partial<CellProps>[]
  defaultColumns?: string[]
  columnPreferences: ListPreferences['columns']
}): Column[] => {
  const { fieldMap, cellProps, defaultColumns, columnPreferences, useAsTitle } = args

  let sortedFieldMap = fieldMap

  const sortTo = defaultColumns || columnPreferences

  if (sortTo) {
    // sort the fields to the order of `defaultColumns` or `columnPreferences`
    // TODO: flatten top level field, i.e. `flattenTopLevelField()` from `payload` but that is typed for `Field`, not `fieldMap`
    sortedFieldMap = fieldMap.sort((a, b) => {
      const aIndex = sortTo.findIndex((column) => column.accessor === a.name)
      const bIndex = sortTo.findIndex((column) => column.accessor === b.name)
      if (aIndex === -1 && bIndex === -1) return 0
      if (aIndex === -1) return 1
      if (bIndex === -1) return -1
      return aIndex - bIndex
    })
  }

  let numberOfActiveColumns = 0

  return sortedFieldMap.reduce((acc, field, index) => {
    const columnPreference = columnPreferences?.find(
      (preference) => preference.accessor === field.name,
    )

    let active = false

    if (columnPreference) {
      active = columnPreference.active
    } else if (defaultColumns && Array.isArray(defaultColumns) && defaultColumns.length > 0) {
      active = defaultColumns.includes(field.name)
    } else if (numberOfActiveColumns < 4) {
      active = true
    }

    if (active) {
      numberOfActiveColumns += 1
    }

    if (field) {
      const column: Column = {
        accessor: field.name,
        active,
        label: field.label,
        name: field.name,
        components: {
          Cell: field.Cell,
          Heading: field.Heading,
        },
        cellProps: cellProps?.[index],
      }

      acc.push(column)
    }

    return acc
  }, [])
}
