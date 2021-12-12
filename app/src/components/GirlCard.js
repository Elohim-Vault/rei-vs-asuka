export default function GirlCard({img, girlName}) {
    return (
        <div className='girl'>
        <h3>Team {girlName}</h3>
        <img src={img} />
        <button>Vote</button>
        <h4>5555</h4>
      </div>
    )
}