import SkinSage from '../../components/works-pages/skinSage';
import MoreWorks from '../../components/works-pages/MoreWorks';
import ScrollToTop from '../../components/ui/ScrollToTop';

export default function SkinSagePage() {
  return (
    <div className="bg-white min-h-screen">
      <SkinSage />
      <MoreWorks current="/works/skinSage" />
      <ScrollToTop />
    </div>
  );
}
