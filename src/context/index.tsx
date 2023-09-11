import { ErrorBoundary } from 'react-error-boundary'
import { Toaster } from 'react-hot-toast'
import { QueryCache, QueryClient, QueryClientProvider } from 'react-query'
// import { ReactQueryDevtools } from 'react-query/devtools'
import { BrowserRouter } from 'react-router-dom'

import { FullPageErrorFallback } from '~/component/lib'
import { AuthProvider } from '~/context/AuthContext'
import { FetchProvider } from '~/context/FetchContext'

// const queryConfig = {
//   queries: {
//     useErrorBoundary: true,
//     refetchOnWindowFocus: false,
//     retry(failureCount, error) {
//       if (error.status === 404) return false
//       else if (failureCount < 2) return true
//       else return false
//     },
//   },
// }

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      //  globally default to 20 seconds
      staleTime: 1000 * 120,
      // the default retryDelay is set to double (starting at 1000ms) with each attempt, but not exceed 30 seconds
      // retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      retry(failureCount, error) {
        if (error instanceof Error && error.message === 'Request failed with status code 401') {
          return false
        }
        if (failureCount < 3) {
          return true
        }
        return false
      },
    },
  },
  queryCache: new QueryCache({
    onError: (error) => {
      if (error instanceof Error) {
        // toast.error(`出了点小错误: ${error.message}`, {
        //   duration: 3000,
        //   position: 'bottom-right',
        // })
      }
    },
  }),
})

function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary FallbackComponent={FullPageErrorFallback}>
      <FetchProvider>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <BrowserRouter>{children}</BrowserRouter>
            {/* <ReactQueryDevtools initialIsOpen={false} /> */}
            <Toaster />
          </QueryClientProvider>
        </AuthProvider>
      </FetchProvider>
    </ErrorBoundary>
  )
}

export default AppProviders
