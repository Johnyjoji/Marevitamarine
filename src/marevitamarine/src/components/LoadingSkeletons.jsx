/**
 * Skeleton loaders — page-shaped placeholders shown on a white background
 * when the network is down or offline navigation occurs.
 * Each mirrors the real page layout for calm, predictable feedback.
 */

export function DefaultSkeleton() {
  return (
    <div className="w-full max-w-7xl mx-auto space-y-8">
      <div className="h-16 w-full max-w-md mx-auto animate-pulse bg-navy-100/80 rounded-full" />
      <div className="space-y-6">
        <div className="h-8 w-3/4 animate-pulse bg-navy-100/80 rounded" />
        <div className="h-16 w-full animate-pulse bg-navy-100/80 rounded" />
        <div className="h-16 w-5/6 animate-pulse bg-navy-100/80 rounded" />
        <div className="h-10 w-48 animate-pulse bg-navy-100/80 rounded-full" />
      </div>
      <div className="space-y-12">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-6 animate-pulse">
            <div className="h-6 w-1/3 bg-navy-100/80 rounded" />
            <div className="h-10 w-2/3 bg-navy-100/80 rounded" />
            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map((j) => (
                <div key={j} className="space-y-4">
                  <div className="h-12 w-12 bg-navy-100/80 rounded-xl" />
                  <div className="h-6 w-3/4 bg-navy-100/80 rounded" />
                  <div className="h-4 w-full bg-navy-100/80 rounded" />
                  <div className="h-4 w-5/6 bg-navy-100/80 rounded" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function HomeSkeleton() {
  return (
    <div className="w-full max-w-7xl mx-auto space-y-8">
      {/* Hero */}
      <div className="min-h-[55vh] flex items-center justify-center">
        <div className="space-y-6 w-full max-w-4xl text-center">
          <div className="h-6 w-48 mx-auto animate-pulse bg-navy-100/80 rounded-full" />
          <div className="h-16 w-full animate-pulse bg-navy-100/80 rounded-xl" />
          <div className="h-16 w-5/6 mx-auto animate-pulse bg-navy-100/80 rounded-xl" />
          <div className="h-6 w-3/4 mx-auto animate-pulse bg-navy-100/80 rounded" />
          <div className="h-12 w-56 mx-auto animate-pulse bg-navy-200/80 rounded-full" />
        </div>
      </div>
      {/* What We Do */}
      <div className="space-y-6 animate-pulse">
        <div className="h-4 w-1/4 bg-navy-100/80 rounded" />
        <div className="h-12 w-full bg-navy-100/80 rounded" />
        <div className="h-12 w-5/6 bg-navy-100/80 rounded" />
        <div className="h-6 w-48 bg-navy-100/80 rounded-full" />
      </div>
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="space-y-3 p-6 rounded-2xl border border-navy-100 bg-navy-50/50">
            <div className="h-12 w-full bg-navy-100/80 rounded" />
            <div className="h-5 w-3/4 bg-navy-100/80 rounded" />
            <div className="h-4 w-1/2 bg-navy-100/80 rounded" />
          </div>
        ))}
      </div>
      {/* Why Choose Us */}
      <div className="space-y-6 animate-pulse">
        <div className="h-10 w-2/3 bg-navy-100/80 rounded" />
        <div className="h-6 w-4/5 bg-navy-100/80 rounded" />
        <div className="grid md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-4 p-6 rounded-2xl border border-navy-100 bg-navy-50/50">
              <div className="h-10 w-10 bg-navy-100/80 rounded-xl" />
              <div className="h-6 w-1/2 bg-navy-100/80 rounded" />
              <div className="h-4 w-full bg-navy-100/80 rounded" />
              <div className="h-4 w-5/6 bg-navy-100/80 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function AboutSkeleton() {
  return (
    <div className="w-full max-w-7xl mx-auto space-y-8">
      <div className="min-h-[45vh] flex items-center">
        <div className="space-y-6 w-full max-w-4xl animate-pulse">
          <div className="h-6 w-48 bg-navy-100/80 rounded-full" />
          <div className="h-16 w-full bg-navy-100/80 rounded" />
          <div className="h-16 w-5/6 bg-navy-100/80 rounded" />
          <div className="h-6 w-2/3 bg-navy-100/80 rounded" />
        </div>
      </div>
      <div className="space-y-6 animate-pulse">
        <div className="h-10 w-1/3 bg-navy-100/80 rounded" />
        <div className="grid md:grid-cols-2 gap-8">
          <div className="aspect-square bg-navy-100/80 rounded-2xl" />
          <div className="space-y-4">
            <div className="h-6 w-1/2 bg-navy-100/80 rounded" />
            <div className="h-4 w-full bg-navy-100/80 rounded" />
            <div className="h-4 w-5/6 bg-navy-100/80 rounded" />
            <div className="h-4 w-3/4 bg-navy-100/80 rounded" />
          </div>
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-6 animate-pulse">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-4 p-6 rounded-2xl border border-navy-100 bg-navy-50/50">
            <div className="h-10 w-10 bg-navy-100/80 rounded-xl" />
            <div className="h-6 w-3/4 bg-navy-100/80 rounded" />
            <div className="h-4 w-full bg-navy-100/80 rounded" />
            <div className="h-4 w-5/6 bg-navy-100/80 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function ServicesSkeleton() {
  return (
    <div className="w-full max-w-7xl mx-auto space-y-8">
      <div className="min-h-[45vh] flex items-center">
        <div className="space-y-6 w-full max-w-4xl animate-pulse">
          <div className="h-6 w-48 bg-navy-100/80 rounded-full" />
          <div className="h-16 w-full bg-navy-100/80 rounded" />
          <div className="h-16 w-5/6 bg-navy-100/80 rounded" />
        </div>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="space-y-4 p-6 rounded-2xl border border-navy-100 bg-navy-50/50">
            <div className="h-12 w-12 bg-navy-100/80 rounded-xl" />
            <div className="h-6 w-1/2 bg-navy-100/80 rounded" />
            <div className="h-4 w-full bg-navy-100/80 rounded" />
            <div className="h-4 w-5/6 bg-navy-100/80 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function FleetSkeleton() {
  return (
    <div className="w-full max-w-7xl mx-auto space-y-8">
      <div className="min-h-[45vh] flex items-end">
        <div className="space-y-6 w-full max-w-4xl animate-pulse">
          <div className="h-6 w-48 bg-navy-100/80 rounded-full" />
          <div className="h-16 w-full bg-navy-100/80 rounded" />
          <div className="h-16 w-5/6 bg-navy-100/80 rounded" />
          <div className="h-6 w-2/3 bg-navy-100/80 rounded" />
          <div className="flex gap-4">
            <div className="h-12 w-48 bg-navy-100/80 rounded-full" />
            <div className="h-12 w-48 bg-navy-100/80 rounded-full" />
          </div>
        </div>
      </div>
      <div className="space-y-6 animate-pulse">
        <div className="h-4 w-1/3 bg-navy-100/80 rounded" />
        <div className="h-10 w-2/3 bg-navy-100/80 rounded" />
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-10 w-32 bg-navy-100/80 rounded-full" />
          ))}
        </div>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="space-y-4 p-6 rounded-2xl border border-navy-100 bg-navy-50/50">
            <div className="h-12 w-12 bg-navy-100/80 rounded-xl" />
            <div className="h-4 w-24 bg-navy-100/80 rounded" />
            <div className="h-6 w-3/4 bg-navy-100/80 rounded" />
            <div className="h-4 w-full bg-navy-100/80 rounded" />
            <div className="h-4 w-5/6 bg-navy-100/80 rounded" />
            <div className="flex flex-wrap gap-2 pt-4">
              {[1, 2, 3].map((j) => (
                <div key={j} className="h-6 w-20 bg-navy-100/80 rounded-md" />
              ))}
            </div>
            <div className="h-12 w-full bg-navy-100/80 rounded-xl mt-4" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function SafetySkeleton() {
  return (
    <div className="w-full max-w-7xl mx-auto space-y-8">
      <div className="min-h-[45vh] flex items-center">
        <div className="space-y-6 w-full max-w-4xl animate-pulse">
          <div className="h-6 w-48 bg-navy-100/80 rounded-full" />
          <div className="h-16 w-full bg-navy-100/80 rounded" />
          <div className="h-16 w-5/6 bg-navy-100/80 rounded" />
        </div>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="space-y-4 p-6 rounded-2xl border border-navy-100 bg-navy-50/50">
            <div className="h-12 w-12 bg-navy-100/80 rounded-xl" />
            <div className="h-6 w-1/2 bg-navy-100/80 rounded" />
            <div className="h-4 w-full bg-navy-100/80 rounded" />
            <div className="h-4 w-5/6 bg-navy-100/80 rounded" />
          </div>
        ))}
      </div>
      <div className="grid md:grid-cols-3 gap-6 animate-pulse">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-4 p-6 rounded-2xl border border-navy-100 bg-navy-50/50">
            <div className="h-10 w-10 bg-navy-100/80 rounded-xl" />
            <div className="h-6 w-3/4 bg-navy-100/80 rounded" />
            <div className="h-4 w-full bg-navy-100/80 rounded" />
            <div className="h-4 w-5/6 bg-navy-100/80 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function CareersSkeleton() {
  return (
    <div className="w-full max-w-7xl mx-auto space-y-8">
      <div className="min-h-[45vh] flex items-center">
        <div className="space-y-6 w-full max-w-4xl animate-pulse">
          <div className="h-6 w-48 bg-navy-100/80 rounded-full" />
          <div className="h-16 w-full bg-navy-100/80 rounded" />
          <div className="h-16 w-5/6 bg-navy-100/80 rounded" />
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-6 animate-pulse">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="space-y-4 p-6 rounded-2xl border border-navy-100 bg-navy-50/50">
            <div className="h-10 w-10 bg-navy-100/80 rounded-xl" />
            <div className="h-6 w-1/2 bg-navy-100/80 rounded" />
            <div className="h-4 w-full bg-navy-100/80 rounded" />
            <div className="h-4 w-5/6 bg-navy-100/80 rounded" />
            <div className="h-10 w-full bg-navy-100/80 rounded-xl mt-4" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function ContactSkeleton() {
  return (
    <div className="w-full max-w-7xl mx-auto space-y-8">
      <div className="min-h-[45vh] flex items-center">
        <div className="space-y-6 w-full max-w-4xl animate-pulse">
          <div className="h-6 w-48 bg-navy-100/80 rounded-full" />
          <div className="h-16 w-full bg-navy-100/80 rounded" />
          <div className="h-16 w-5/6 bg-navy-100/80 rounded" />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-8 animate-pulse">
        <div className="space-y-6">
          <div className="h-6 w-1/3 bg-navy-100/80 rounded" />
          <div className="h-10 w-1/2 bg-navy-100/80 rounded" />
          <div className="h-4 w-full bg-navy-100/80 rounded" />
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="h-10 w-10 bg-navy-100/80 rounded-xl" />
                <div className="space-y-1">
                  <div className="h-4 w-1/2 bg-navy-100/80 rounded" />
                  <div className="h-4 w-3/4 bg-navy-100/80 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-6 p-8 rounded-2xl border border-navy-100 bg-navy-50/50">
          <div className="h-6 w-1/3 bg-navy-100/80 rounded" />
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-12 w-full bg-navy-100/80 rounded-xl" />
            ))}
          </div>
          <div className="h-12 w-48 bg-navy-200/80 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function getSkeletonForRoute(pathname) {
  switch (pathname) {
    case '/':
      return HomeSkeleton;
    case '/about':
      return AboutSkeleton;
    case '/services':
      return ServicesSkeleton;
    case '/fleet':
      return FleetSkeleton;
    case '/safety':
      return SafetySkeleton;
    case '/careers':
      return CareersSkeleton;
    case '/contact':
      return ContactSkeleton;
    default:
      return DefaultSkeleton;
  }
}
