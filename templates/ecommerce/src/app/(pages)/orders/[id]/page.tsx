import React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { Order as OrderType } from '../../../../payload/payload-types'
import { fetchDocs } from '../../../_cms/fetchDocs'
import { Button } from '../../../_components/Button'
import { Gutter } from '../../../_components/Gutter'
import { Media } from '../../../_components/Media'
import { getMeUser } from '../../../_utilities/getMeUser'

import classes from './index.module.scss'

const Order = async ({ params: { id } }) => {
  const { token } = await getMeUser({
    nullUserRedirect: `/login?unauthorized=order`,
  })

  const orderReq = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/orders/${id}`, {
    headers: {
      Authorization: `JWT ${token}`,
    },
  })

  const order = await orderReq.json()

  if (!orderReq.ok || !order) {
    notFound()
  }

  return (
    <Gutter className={classes.orders}>
      <h1>Order</h1>
      <p>{`Order ID: ${id}`}</p>
      {order && (
        <div className={classes.order}>
          <h4 className={classes.orderTitle}>Items</h4>
          {order.items?.map((item, index) => {
            let product

            if (typeof item.product === 'object') {
              product = item.product
            }

            const isLast = index === (order?.items?.length || 0) - 1

            return (
              <ul className={classes.itemsList} key={index}>
                <li className={classes.item}>
                  <div className={classes.row}>
                    <div className={classes.mediaWrapper}>
                      {!product.meta.image && <span className={classes.placeholder}>No image</span>}
                      {product.meta.image && typeof product.meta.image !== 'string' && (
                        <Media imgClassName={classes.image} resource={product.meta.image} fill />
                      )}
                    </div>
                    <div className={classes.rowContent}>
                      <Link href={`/products/${product.slug}`}>
                        <h6 className={classes.title}>{product.title}</h6>
                      </Link>
                      <div>{`Quantity ${item.quantity}`}</div>
                      <div>
                        {/* TODO: get actual price */}
                        {`Price: $${0}`}
                      </div>
                    </div>
                  </div>
                  {!isLast && <hr className={classes.rowHR} />}
                </li>
              </ul>
            )
          })}
        </div>
      )}
      <h4>
        {/* TODO: get actual price */}
        {`Order Total: $0`}
      </h4>
      <br />
      <Button href="/orders" appearance="primary" label="See all orders" />
      <br />
      <br />
      <Button href="/account" appearance="secondary" label="Go to account" />
    </Gutter>
  )
}

export async function generateStaticParams() {
  const orders = await fetchDocs<OrderType>('orders')

  return orders?.map(({ id }) => id)
}

export default Order
