import { Dispatch, SetStateAction, useEffect, useState} from 'react'
import { Popover, Button, Row } from '@nextui-org/react'
import { ChevronDown } from 'lucide-react'
import { Speciality } from '@/interfaces/interfaces'
import { specialities } from '@/constants/constants'

type Props = {
  setEndpoint: Dispatch<SetStateAction<string>>
  loading: boolean
}

export default function FilterAppointments({setEndpoint, loading}: Props) {
  const [option, setOption] = useState<'all' | number>('all')

  useEffect(() => {
    if (option === 'all') setEndpoint('appointments?')
    else setEndpoint(`appointments?speciality=${option}&`)
  }
  , [option, setEndpoint])

  return (
    <Popover placement='bottom-left'>
      <Popover.Trigger>
        <Button 
          auto
          type='button' 
          disabled={loading}
        >
          {option === 'all' ? 'Todas' : specialities[option]}
          <ChevronDown size={25}/>
        </Button>
      </Popover.Trigger>
      <Popover.Content css={{ zIndex: "200 !important", p: "$4" }}>
        <Row css={{gap: '$4', flexDirection: 'column'}}>
          <Button
            type='button'
            flat
            onClick={() => setOption('all')}
            disabled={loading}
          >
            Todas
          </Button>
          {specialities.map((speciality) => (
            <Button
              key={speciality}
              flat
              size='md'
              onClick={() => setOption(specialities.indexOf(speciality))}
              disabled={loading}
            >
              {speciality}
            </Button>
          ))}
        </Row>
      </Popover.Content>
    </Popover>
  )
}