'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import {
  DialogFooter,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Loader, Frown, CornerDownLeft, Wand } from 'lucide-react'


export function ConvertDialog() {
  const [search, setSearch] = React.useState('')
  const [data, setData] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)
  const [hasError, setHasError] = React.useState(false)

  const handleSubmit = (e) => {
    e.preventDefault();

    if ( search.length <= 0 ) {
      setHasError(true);
      return;
    }

    setData('')
    setHasError(false);
    setIsLoading(true);

    fetch( '/api/yt-text', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        link : search
      })
    } )
    .then((res) => res.json())
      .then((data) => {
        setData(data)
    } ).catch( () => {
      setHasError(true)
    } ).finally( () => setIsLoading(false) );
    
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4 py-4 text-slate-700">
          <div className="flex gap-4">
            <span className="p-2 h-8 text-white rounded-full text-center flex items-center justify-center" style={{width:'100%'}}>
              YouTube to Text Convert
            </span>
          </div>

          {hasError && (
            <div className="flex items-center gap-4">
              <span className="bg-red-100 p-2 w-8 h-8 rounded-full text-center flex items-center justify-center">
                <Frown width={18} />
              </span>
              <span className="text-slate-700 dark:text-slate-100">
                Sad news, converting has failed! Please try again.
              </span>
            </div>
          )}

          <div className="relative">
            <Input
              placeholder="Paste here link of the YouTube video"
              name="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="col-span-3"
            />
            <CornerDownLeft
              className={`absolute top-3 right-5 h-4 w-4 text-gray-300 transition-opacity ${
                search ? 'opacity-100' : 'opacity-0'
              }`}
            />
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-100" style={{zIndex:'999'}}>
            Or try:{' '}
            <button
              type="button"
              className="px-1.5 py-0.5
              bg-slate-50 dark:bg-gray-500
              hover:bg-slate-100 dark:hover:bg-gray-600
              rounded border border-slate-200 dark:border-slate-600
              transition-colors"
              onClick={(_) =>
                setSearch('https://www.youtube.com/watch?v=bLd1nfP6t0A&pp=ygUIY25uIG5ld3M%3D')
              }
            >
              https://www.youtube.com/watch?v=bLd1nfP6t0A&pp=ygUIY25uIG5ld3M%3D
            </button>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" className="bg-red-500">
            Transcript
          </Button>
        </DialogFooter>

        {isLoading && (
        <div className="flex items-center gap-4 dark:text-white">
          <div className="animate-spin items-center relative flex w-5 h-5 ml-2">
            <Loader />
          </div>
          Loading
        </div>
        )}
        
        {data && !hasError ? (
          <>
            <div className="flex items-center gap-4 dark:text-white">
              <span className="bg-green-500 p-2 w-8 h-8 rounded-full text-center flex items-center justify-center">
                <Wand width={18} className="text-white" />
              </span>
              <h3 className="font-semibold">Title : {data?.title}</h3>
            </div>
            <div className='flex' style={{justifyContent:'center'}}>
              <img src={data.image}/>
            </div>
            <div className='m-4 text-justify'>
              <ul>
              {
                data.text.map( ( item, index ) => {
                  return (
                    <li key={index}>
                      {item}<br/><br/>
                    </li>
                  )
                })
              }
              </ul>
            </div>
          </>
          ) : null}
      </form>
    </>
  )
}
