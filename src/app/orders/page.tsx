import OrderCard from '../components/orderCard'

export default function Orders() {
  return (
    <div className='flex flex-col justify-center items-center'>
	  <h1 className='text-4xl'>Orders</h1>
    <OrderCard
      orderNumber='123456'
      status='Preparing'
      orderDate='2021-06-01'
      deliveryAddress='123 Fake Street'
      total='10.00'
    />
	</div>
  )
}
