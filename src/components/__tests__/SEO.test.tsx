// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import SEO from '../SEO';

// Mock window.location
const mockLocation = {
  origin: 'https://binkoo.digital',
  pathname: '/test-page',
};

beforeEach(() => {
  vi.stubGlobal('location', mockLocation);
  document.head.innerHTML = '';
});

describe('SEO Component', () => {
  const defaultProps = {
    title: 'Test Title',
    description: 'This is a test description for SEO testing purposes.',
  };

  it('renders correct document title and meta description', async () => {
    render(
      <HelmetProvider>
        <SEO {...defaultProps} />
      </HelmetProvider>
    );

    await waitFor(() => {
      expect(document.title).toContain('Test Title | BinkoO Digital Lab');
    });
    
    const metaDesc = document.querySelector('meta[name="description"]')?.getAttribute('content');
    expect(metaDesc).toBe('This is a test description for SEO testing purposes.');
  });

  it('handles description truncation when longer than 155 chars', async () => {
    const longDescription = 'a'.repeat(200);
    render(
      <HelmetProvider>
        <SEO {...defaultProps} description={longDescription} />
      </HelmetProvider>
    );

    await waitFor(() => {
      const metaDesc = document.querySelector('meta[name="description"]')?.getAttribute('content');
      const expectedTruncated = 'a'.repeat(152) + '...';
      expect(metaDesc).toBe(expectedTruncated);
    });
  });

  it('computes canonical URL properly', async () => {
    render(
      <HelmetProvider>
        <SEO {...defaultProps} />
      </HelmetProvider>
    );

    await waitFor(() => {
      const canonicalLink = document.querySelector('link[rel="canonical"]')?.getAttribute('href');
      expect(canonicalLink).toBe('https://binkoo.digital/test-page');
    });
  });

  it('applies explicit canonical URL when provided', async () => {
    const explicitCanonical = 'https://binkoo.digital/explicit-canonical';
    render(
      <HelmetProvider>
        <SEO {...defaultProps} canonical={explicitCanonical} />
      </HelmetProvider>
    );

    await waitFor(() => {
      const canonicalLink = document.querySelector('link[rel="canonical"]')?.getAttribute('href');
      expect(canonicalLink).toBe(explicitCanonical);
    });
  });

  it('injects structured data JSON-LD graph correctly', async () => {
    render(
      <HelmetProvider>
        <SEO {...defaultProps} />
      </HelmetProvider>
    );

    await waitFor(() => {
      const scripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
      const hasStructuredData = scripts.some(script => {
        const content = script.textContent || '';
        return content.includes('"@type":"Organization"') &&
               content.includes('"@type":"ProfessionalService"') &&
               content.includes('"@type":"WebSite"');
      });
      expect(hasStructuredData).toBe(true);
    });
  });

  it('adds FAQ structural data when faq prop is provided', async () => {
    const faqs = [{ q: 'Question 1?', a: 'Answer 1.' }];
    render(
      <HelmetProvider>
        <SEO {...defaultProps} faq={faqs} />
      </HelmetProvider>
    );

    await waitFor(() => {
      const scripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
      const hasFAQData = scripts.some(script => {
        const content = script.textContent || '';
        return content.includes('"@type":"FAQPage"') &&
               content.includes('"name":"Question 1?"') &&
               content.includes('"text":"Answer 1."');
      });
      expect(hasFAQData).toBe(true);
    });
  });
});
