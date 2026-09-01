import { type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import Home from '@/pages/home';
import Tools from '@/pages/tools';
import ToolPage from '@/pages/tool-page';
import About from '@/pages/about';
import Legal from '@/pages/legal';
import CategoryPage from '@/pages/category-page';
import {
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';

const queryClient = new QueryClient();

function Router() {
  return (
    // Keep a shared shell (sidebar, navbar) outside the boundary so it
    // survives a page crash.
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/tools" component={Tools} />
        <Route path="/tools/image" component={CategoryPage} />
        <Route path="/tools/pdf" component={CategoryPage} />
        <Route path="/tools/text" component={CategoryPage} />
        <Route path="/tools/developer" component={CategoryPage} />
        <Route path="/tools/security" component={CategoryPage} />
        <Route path="/tools/color" component={CategoryPage} />
        <Route path="/tools/calculator" component={CategoryPage} />
        <Route path="/tools/date-time" component={CategoryPage} />
        <Route path="/tools/web" component={CategoryPage} />
        <Route path="/tools/generators" component={CategoryPage} />
        <Route path="/tools/:slug" component={ToolPage} />
        <Route path="/about" component={About} />
        <Route path="/privacy" component={Legal} />
        <Route path="/terms" component={Legal} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
